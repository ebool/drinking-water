<template>
  <v-app>
    <v-toolbar
    color="blue darken-3"
    dark
    >
      <v-toolbar-title>How much you drink</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showUserInfoDialog">
        <v-icon>perm_identity</v-icon>
      </v-btn>
      <v-dialog
        :value="isShowUserInfo || userInfoDialog"
        dark
        persistent
        color="primary"
        max-width="600px"
      >
        <v-card>
          <v-form ref="form">
            <v-card-title class="headline">몸무게 설정하기</v-card-title>
            <v-card-text>
              <v-text-field
              suffix="kg"
              :rules="weightRules"
              required v-model="userWeight"
              label="체중"
              hint="체중을 입력해주세요"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" flat @click.native="save">저장</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  store,
  components: {
    buttonCont,
    records,
    waterBoard
  },
  data () {
    return {
      userWeight: '',
      weightRules: [
        v => !!v || '몸무게는 꼭 입력해야해!',
        v => (v < 635) || '기네스북에 등재된 가장 체중이 많이 나가는 사람은 미국의 "존 브로 미녹"이고 그의 몸무게는 635kg이다',
        v => (Number.isInteger((new Number(v)).valueOf())) || '체중은 정수로 입력하세요. 소수점은 반올림 하셈'
      ],
      userInfoDialog: false
    }
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
    },
    '$store.state.user': {
      handler: (d) => {
        console.log(d);
        window.localStorage.setItem('user', JSON.stringify(d));
      },
      deep: true
    }
  },
  computed: {
    isShowUserInfo () {
      return !this.user.weight;
    },
    ...mapState(['user'])
  },
  methods: {
    showUserInfoDialog () {
      this.userInfoDialog = true;
    },
    save () {
      if (this.$refs.form.validate()) {
        this.setUserWeight(parseInt(this.userWeight));
        this.userInfoDialog = false;
      }
    },
    ...mapMutations(['setUserWeight', 'setUser'])
  },
  mounted () {
    let history = window.localStorage.getItem('drinkHistory');
    this.$store.commit('setDrinkHistory', JSON.parse(history) || []);

    let buttons = window.localStorage.getItem('buttons');
    this.$store.commit('setButtons', JSON.parse(buttons) || this.$store.state.buttons);

    let user = window.localStorage.getItem('user');
    this.setUser(JSON.parse(user) || {});
  }
};
</script>

<style scoped lang="scss">
</style>
