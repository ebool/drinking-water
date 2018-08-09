import Vue from 'vue';
import Vuex from 'vuex';
import {filter, map, isToday, parseLiter} from '@/assets/utils.js';

Vue.use(Vuex);

const state = {
  user: {
    weight: 80
  },
  drinkHistory: [],
  buttons: {
    list: [
      {name: 'wework 머그컵', amount: 350, type: '0'},
      {name: '허벌라이프', amount: 1000, type: '1'}
    ],
    lastPK: 1
  }
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
  },
  addButton (state, {name, amount}) {
    state.buttons.list.push({
      name,
      amount,
      type: String(++state.buttons.lastPK)
    })
  },
  setButtons (state, buttons) {
    this.state.buttons = buttons;
  },
  removeButtons (state, buttons) {
    for (let item of buttons) {
      let btnList = map(state.buttons.list, (i) => { return i.type });
      let index = btnList.indexOf(item);
      if (index >= 0) state.buttons.list.splice(index, 1);
    }
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
  },
  getButtons (state) {
    return state.buttons.list;
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
