<template>
  <v-flex class="button-cont">
    <v-btn outline round color="primary" v-for="i in getButtons" :key="i.type" @click="drink(i)">{{i.name}} ({{i.amount}}ml)</v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px" value>
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
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="submit">Save</v-btn>
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
      dialog: false,
      buttonName: '',
      bottleAmount: '',
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
    submit () {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.addButton({name: this.buttonName, amount: parseInt(this.bottleAmount)});
      }
    },
    ...mapMutations(['addDrinkHistory', 'addButton'])
  },
  computed: {
    ...mapGetters(['getButtons'])
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
