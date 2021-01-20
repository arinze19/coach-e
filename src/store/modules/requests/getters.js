export default {
    requests(state) {
        //const coachId  = rootGetters.userId  , _, _2, rootGetters
        
        return state.requests
        // .filter(req => req.coachId === coachId)    ==== is filter even needed?
        
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0
    }
}