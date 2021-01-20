let timer;


export default {
  async login({ dispatch }, payload) {
    const configApi = {
      ...payload,
      link:
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUuRITwnID8NAhhe6A6odmNyRpPnjn6ZE'
    };
    return dispatch('fetchAuthentication', configApi);
  },

  async signup({ dispatch }, payload) {
    const configApi = {
      ...payload,
      link:
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUuRITwnID8NAhhe6A6odmNyRpPnjn6ZE'
    };
    return dispatch('fetchAuthentication', configApi);
  },

  async fetchAuthentication({ commit, dispatch }, payload) {
    const url = payload.link;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    }

    const expiresIn      = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn


    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('expirationDate', expirationDate)

    timer = setTimeout(function() {
      dispatch('setAutoLogout')
    }, expiresIn)

    const userData = {
      token: responseData.idToken,
      userId: responseData.localId,
    };
    commit('setUser', userData);
  },

  tryLocalLogin({ commit, dispatch }) {
    const token           = localStorage.token
    const userId          = localStorage.userId
    const tokenExpiration = localStorage.expirationDate

    const expiresIn       = +tokenExpiration - new Date().getTime()

    if(expiresIn < 0) {
      return;
    }

    timer = setTimeout(function(){
      dispatch('setAutoLogout')
    }, expiresIn)

    if(token && userId) {
      const userData = {
        userId: userId,
        token: token
      }

      commit('setUser', userData)
    }

  },

  logout({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    clearTimeout(timer)

    const resetData = {
      token: null,
      userId: null
    };

    commit('setUser', resetData);
  },

  setAutoLogout({ commit }) {
    const resetData = {
      token: null,
      userId: null
    };

    commit('setUser', resetData)
    commit('setAutoLogout')
  }
};
