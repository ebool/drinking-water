<template>
  <v-app>
    <v-toolbar
    color="blue darken-3"
    dark
    >
      <v-toolbar-title>How much you drink</v-toolbar-title>
    </v-toolbar>
    <v-container fill-height pa-0 fluid>
      <v-layout column>
        <v-layout><water-board /></v-layout>
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
    }
  },
  mounted () {
    let history = window.localStorage.getItem('drinkHistory');
    this.$store.commit('setDrinkHistory', JSON.parse(history) || []);
  }
};
</script>

<style scoped lang="scss">
</style>
