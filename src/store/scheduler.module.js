import SchedulerService from "../services/scheduler.service";
export const scheduler = {
  namespaced: true,
  //   state: initialState,
  actions: {
    newevent({ commit }, event) {
      SchedulerService.addevent(event);
      commit("addevent");
    },
    allevents() {
      return SchedulerService.allevents();
    },
    // updateevent(event) {
    //   return SchedulerService.updateevent(event);
    // },
    deleteevent(z) {
      SchedulerService.deleteevent(z);
      console.log("from vuex", z);
    },
  },
  //   mutations: {
  //     loginSuccess(state, user) {
  //       state.status.loggedIn = true;
  //       state.user = user;
  //     },
  //     loginFailure(state) {
  //       state.status.loggedIn = false;
  //       state.user = null;
  //     },
  //     logout(state) {
  //       state.status.loggedIn = false;
  //       state.user = null;
  //     },
  //     registerSuccess(state) {
  //       state.status.loggedIn = false;
  //     },
  //     registerFailure(state) {
  //       state.status.loggedIn = false;
  //     },
  //   },
};
