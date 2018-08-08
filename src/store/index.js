import Vue from 'vue';
import Vuex from 'vuex';
import {filter, map, isToday, parseLiter} from '@/assets/utils.js';

Vue.use(Vuex);

const state = {
  user: {
    weight: 80
  },
  drinkHistory: []
}
const mutations = {
  addDrinkHistory (state, history) {
    state.drinkHistory.push(history);
  },
  removeDrinkHistory (state, history) {
    let r = map(state.drinkHistory, (i) => { return i.date });
    state.drinkHistory.splice(r.indexOf(history.date), 1);
  },
  setDrinkHistory (state, history) {
    state.drinkHistory = history;
  }
}
const getters = {
  recommendedAmount (state) {
    return state.user.weight * 0.03;
  },
  todayDrinkWater (state, getters) {
    let todayAmount = 0;
    for (let i of getters.todayDrinkHistory) { todayAmount += i.cup.amount; }
    return parseLiter(todayAmount);
  },
  todayDrinkHistory (state) {
    return filter(state.drinkHistory, (i) => { return isToday(i.date) });
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
