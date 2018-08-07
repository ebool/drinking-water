<template>
  <v-flex class="records-cont" pa-3>
    <v-flex class="ma-2 msg-cont" v-for="i in getTodayHistory" :key="i.date">
      <div class="time">{{getTime(i.date)}}</div>
      <v-card class="card">
        <v-card-title class="pr-0">"{{i.cup.name}}"으로 {{parse(i.cup.amount)}}L를 마셨습니다.</v-card-title>
        <v-btn class="" flat icon @click="removeItem(i)"><v-icon>delete_outline</v-icon></v-btn>
      </v-card>
    </v-flex>
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
}
</style>
