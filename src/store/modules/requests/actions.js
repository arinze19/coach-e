export default {
  async requestCoach(_, messageReq) {
    const newMessage = {
      email: messageReq.email,
      message: messageReq.message
    };

    const response = await fetch(
      `https://vue-http-998df-default-rtdb.firebaseio.com/requests/${messageReq.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newMessage)
      }
    );
    if (!response.ok) {
        console.log('something went wrong');
    }

    const responseData = await response.json()
    newMessage.id      = responseData.name
    newMessage.coachId = messageReq.coachId

    // commit('requestCoach', newMessage);       ======= delete this? it's not in use anyway  { commit }
  },

  async getRequests({ commit, rootGetters }) {
    const coachId      = rootGetters.userId
    const token        = rootGetters.token
    const response     = await fetch(`https://vue-http-998df-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
    const responseData = await response.json()

    if(!response.ok) {
      const error = new Error(response.message || 'An error occured...')
      throw error 
    }


    const requestsList = []
    
    for(const req in responseData) {
        const request = {
            id: req,
            // coachId: coachId,        === necessary?
            email: responseData[req].email,
            message: responseData[req].message
        }

        requestsList.push(request)
    }
    commit('requestCoach', requestsList)
  }
};

