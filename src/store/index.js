import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    roomlist: [],
    username: ''
  },
  mutations: {
    updaterooms(state, payload) {
      state.roomlist = payload;
    },
    updateUsername(state, payload) {
      state.username = payload;
    }
  },
  actions: {},
  modules: {}
});
