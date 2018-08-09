<template>
  <v-flex class="text-md-center pa-3" d-inline >
    <v-btn outline round color="primary" small v-for="i in getButtons" :key="i.type" @click="drink(i)">{{i.name}} ({{i.amount}}ml)</v-btn>
    <v-dialog v-model="addDialog" persistent max-width="500px" value>
      <v-btn small fab color="primary" slot="activator"><v-icon>library_add</v-icon></v-btn>
      <v-card>
        <v-form ref="form">
          <v-card-title class="headline">버튼 추가하기</v-card-title>
          <v-card-text>
            <v-text-field :rules="nameRules" required v-model="buttonName" clearable label="버튼 이름" hint="버튼의 이름을 입력해주세요"></v-text-field>
            <v-text-field :rules="amountRules" required v-model="bottleAmount" clearable label="물병의 용량(mL)" hint="물병의 용량을 입력해주세요"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" flat @click.native="dismissAddDialog">닫기</v-btn>
            <v-btn color="blue darken-1" flat @click.native="add">추가</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="removeDialog" persistent max-width="500px" value>
      <v-btn small fab color="error" slot="activator"><v-icon>remove</v-icon></v-btn>
      <v-card>
        <v-form ref="form">
          <v-card-title class="headline">버튼 추가하기</v-card-title>
          <v-card-text>
            <v-checkbox v-model="removeBtnList" :value="i.type" v-for="i in getButtons" :key="i.type" :label="`${i.name} (${i.amount}mL)`"></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" flat @click.native="removeDialog = false">닫기</v-btn>
            <v-btn color="error darken-1" flat @click.native="remove">삭제</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data () {
    return {
      addDialog: false,
      removeDialog: false,
      buttonName: '',
      bottleAmount: '',
      removeBtnList: [],
      nameRules: [
        v => !!v || '버튼 이름은 꼭 입력해야해!',
        v => (v && v.length <= 10) || '너무 길어! 10자 이하로.'
      ],
      amountRules: [
        v => !!v || '물병의 용량은 꼭 입력해야해!',
        v => (Number.isInteger((new Number(v)).valueOf())) || '용량은 정수로 입력하세요. 소수점은 반올림 하셈'
      ]
    }
  },
  methods: {
    drink (cup) {
      let date = +new Date();
      this.addDrinkHistory({date, cup});
    },
    add () {
      if (this.$refs.form.validate()) {
        this.addButton({name: this.buttonName, amount: parseInt(this.bottleAmount)});
        this.dismissAddDialog();
      }
    },
    remove () {
      if (this.removeBtnList.length > 0) {
        this.removeButtons(this.removeBtnList);
      }
      this.dismissRemoveDialog();
    },
    dismissAddDialog () {
      this.buttonName = '';
      this.bottleAmount = '';
      this.addDialog = false;
    },
    dismissRemoveDialog () {
      this.removeBtnList = [];
      this.removeDialog = false;
    },
    ...mapMutations(['addDrinkHistory', 'addButton', 'removeButtons'])
  },
  computed: {
    ...mapGetters(['getButtons'])
  }
}
</script>

<style scoped lang="scss">
</style>
