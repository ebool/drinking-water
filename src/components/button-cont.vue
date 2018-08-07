<template>
  <v-flex class="button-cont">
    <v-btn v-for="i in buttons" :key="i.type" @click="drink(i)">{{i.name}} ({{i.amount}}ml)</v-btn>
  </v-flex>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data () {
    return {
      buttons: [
        {name: 'wework 머그컵', amount: '350', type: '0'},
        {name: '허벌라이프', amount: '1000', type: '1'}
      ]
    }
  },
  methods: {
    drink (cup) {
      let date = +new Date();
      this.addDrinkHistory({date, cup});
    },
    ...mapMutations(['addDrinkHistory'])
  }
}
</script>

<style scoped lang="scss">
.button-cont {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
