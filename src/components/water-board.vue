<template>
  <v-layout class="water-board-cont">
    <v-flex class="text">
      <div>오늘 마신 물의 양</div>
      <div>오늘 마셔야 할 물의 양</div>
    </v-flex>
    <v-flex class="visual">
      <div>물이 차오르는 그릇</div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.water-board-cont {
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
