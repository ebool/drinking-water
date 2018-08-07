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

export default {
  name: 'App',
  components: {
    buttonCont,
    records,
    waterBoard
  }
};
</script>

<style scoped lang="scss">
</style>
