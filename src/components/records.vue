<template>
  <v-flex class="records-cont" pa-3>
    <transition-group tag="div" name="list">
      <v-flex class="ma-2 msg-cont" v-for="i in getTodayHistory" :key="i.date">
        <div class="time">{{getTime(i.date)}}</div>
        <v-card class="card">
          <v-card-title class="pr-0">"{{i.cup.name}}"으로 {{parse(i.cup.amount)}}L를 마셨습니다.</v-card-title>
          <v-btn class="" flat icon @click="removeItem(i)"><v-icon>delete_outline</v-icon></v-btn>
        </v-card>
      </v-flex>
    </transition-group>
  </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { parseLiter } from '@/assets/utils.js';

export default {
  computed: {
    getTodayHistory () {
      return this.todayDrinkHistory.slice(0).reverse();
    },
    ...mapGetters(['todayDrinkHistory'])
  },
  methods: {
    parse (s) {
      return parseLiter(s);
    },
    getTime (s) {
      let t = new Date(s);
      return `${this.add0(t.getHours())}:${this.add0(t.getMinutes())}:${this.add0(t.getSeconds())}`
    },
    add0 (s) {
      return s <= 9 ? `0${s}` : s;
    },
    removeItem (i) {
      this.removeDrinkHistory(i);
    },
    ...mapMutations(['removeDrinkHistory'])
  }
}
</script>

<style scoped lang="scss">
.records-cont {
  overflow: auto;
  max-height: 90vh;

  .msg-cont {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .time {
      color: grey;
      margin-right: 8px;
      font-size: 9px;
    }
    .card {
      display: flex;
      align-items: center;
    }
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all .3s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
