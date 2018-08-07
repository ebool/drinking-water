import Vue from 'vue';
import Vuex from 'vuex';
import {filter, isToday, parseLiter} from '@/assets/utils.js';

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
  }
}
const getters = {
  recommendedAmount (state) {
    console.log('state', state);
    return state.user.weight * 0.03;
  },
  todayDrinkWater (state) {
    let todayList = filter(state.drinkHistory, (i) => { return isToday(i.date) });
    let todayAmount = 0;
    for (let i of todayList) { todayAmount += i.cup.amount; }
    console.log(todayAmount);
    return parseLiter(todayAmount);
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
