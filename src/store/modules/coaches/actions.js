export default {
  async registerCoach({ commit, rootGetters }, data) {
    const userId = rootGetters.userId; // ================ cos coach will already have an ID upon sign up/login
    const token = rootGetters.token
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      hourlyRate: data.rate,
      description: data.desc
    };

    const response = await fetch(
      `https://vue-http-998df-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    if(!response.ok) {
      const error = new Error(response.message || 'something went wrong...')
      throw error
    }

    commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },

  async getCoaches({ commit, getters }, payload) {

    if(!payload.refresh && !getters.shouldUpdate) {
      return 
    }

    const response     = await fetch('https://vue-http-998df-default-rtdb.firebaseio.com/coaches.json')
    if(!response.ok) {
      const error = new Error(response.message || 'an error occured...')
      throw error
    }

    const responseData = await response.json()
    const coachesList      = []

    for(const key in responseData) {
      const coach = {
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        hourlyRate: responseData[key].hourlyRate,
        description: responseData[key].description,
        id: key
      }
      coachesList.push(coach)
    }

    commit('getCoaches', coachesList)
    commit('setTimestamp')
  }
};
