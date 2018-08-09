<template>
  <v-app>
    <v-toolbar
    color="blue darken-3"
    dark
    >
      <v-toolbar-title>How much you drink</v-toolbar-title>
    </v-toolbar>
    <v-container fill-height pa-0 fluid>
      <v-layout column style="flex: 20">
        <v-layout style="flex: 10"><water-board /></v-layout>
        <v-layout><button-cont /></v-layout>
      </v-layout>
      <v-layout><records /></v-layout>
    </v-container>
  </v-app>
</template>

<script>
import buttonCont from './components/button-cont.vue';
import records from './components/records.vue';
import waterBoard from './components/water-board.vue';
import store from './store/index.js';

export default {
  name: 'App',
  store,
  components: {
    buttonCont,
    records,
    waterBoard
  },
  watch: {
    '$store.state.drinkHistory': (d) => {
      window.localStorage.setItem('drinkHistory', JSON.stringify(d));
    },
    '$store.state.buttons': {
      handler: (d) => {
        window.localStorage.setItem('buttons', JSON.stringify(d));
      },
      deep: true
    }
  },
  mounted () {
    let history = window.localStorage.getItem('drinkHistory');
    this.$store.commit('setDrinkHistory', JSON.parse(history) || []);

    let buttons = window.localStorage.getItem('buttons');
    this.$store.commit('setButtons', JSON.parse(buttons) || this.$store.state.buttons);
  }
};
</script>

<style scoped lang="scss">
</style>
