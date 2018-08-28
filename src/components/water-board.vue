<template>
  <v-layout class="water-board-cont">
    <!-- <v-flex class="text">
      <div>오늘 마신 물의 양 / 오늘 마셔야 할 물의 양</div>
      <div>{{todayDrinkWater}}L / {{recommendedAmount}}L</div>
    </v-flex> -->
    <bottle></bottle>

  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Bottle from './bottle.vue';

export default {
  components: {
    Bottle
  },
  computed: {
    ...mapGetters(['recommendedAmount', 'todayDrinkWater'])
  }
}
</script>

<style lang="scss" scoped>
.water-board-cont {
  // background-color: aqua;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .visual {
    display: flex;
    flex: 2.5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
