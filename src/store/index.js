import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  drinkHistory: []
}
const mutations = {
  addDrinkHistory (state, history) {
    state.drinkHistory.push(history);
  }
}
const getters = {}
const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
