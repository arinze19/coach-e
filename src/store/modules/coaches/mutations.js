export default {
  registerCoach(state, coachData) {
    state.coaches.push(coachData);
  },
  getCoaches(state, payload) {
    state.coaches = payload;
  },
  setTimestamp(state) {
      const newStamp = new Date().getTime();
      state.lastFetch = newStamp
  }
};
