<template>
    <div class="customers">
        <md-dialog-prompt
                :md-active.sync="active"
                v-model="inputName"
                md-title="고객의 이름이 무엇인가요?"
                md-input-maxlength="30"
                md-input-placeholder="이름을 입력해주세요..."
                md-confirm-text="확인"
                md-cancel-text="취소"
                @md-confirm="onConfirmDialog"
                @md-cancel="onCancelDialog"/>
        <md-dialog-alert
                :md-active.sync="isAlert"
                :md-content="alertContent"
                md-confirm-text="확인"/>
        <md-button class="add-btn md-raised md-primary" @click="active = true">고객 추가</md-button>
        <v-data-table
                :headers="headers"
                :items="datas"
                hide-actions
                class="elevation-1">
            <template slot="items" slot-scope="data">
                <td class="text-xs-left">{{ data.item.idx }}</td>
                <td class="text-xs-left">{{ data.item.name }}</td>
                <td class="text-xs-left">{{ data.item.total_money }}</td>
                <td class="text-xs-left">{{ data.item.total_payback_money }}</td>
                <!--<td class="text-xs-left">{{ data.item.trust_percent }}</td>-->
                <td class="text-xs-left">{{ data.item.date_updated }}</td>
                <td class="text-xs-left">{{ data.item.date_created }}</td>
            </template>
            <template slot="footer">
                <td colspan="100%">
                    <strong>
                        총 빌린 금액 : {{ totalMoney }} - 총 갚은 금액 : {{ totalPaybackMoney }} = 남은 금액 {{ totalWaitMoney }}
                    </strong>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<style>
    .customers {
        width: 100vw;
        padding: 5vh 3vw;
        text-align: right;
    }

    .add-btn {
        margin-right: 0;
    }
</style>

<script>
import axios from 'axios'
import { getISODate } from '../utils/date'

export default {
  data () {
    return {
      headers: [
        {
          text: '고유값',
          value: 'idx'
        },
        { text: '이름', value: 'name' },
        { text: '총 빌린 금액(원)', value: 'totalMoney' },
        { text: '총 갚은 금액(원)', value: 'totalPaybackMoney' },
        // { text: '신용도 (%)', value: 'trustPercent' },
        { text: '마지막 업데이트', value: 'dateUpdated' },
        { text: '첫 대여 일시', value: 'dateCreated' }
      ],
      datas: [],
      totalMoney: 0,
      totalPaybackMoney: 0,
      totalWaitMoney: 0,
      active: false,
      inputName: null,
      isAlert: false,
      alertContent: ''
    }
  },
  methods: {
    async onConfirmDialog (data) {
      // TODO : 한글을 입력하고 바로 엔터치면 뒤에 한글자 짤리는거 문제 있음
      const { status } = await axios.post('http://localhost:5000/api/customers', {
        name: data
      })
      this.isAlert = true
      if (status === 200) this.alertContent = '성공적으로 고객을 등록하였습니다!'
      else this.alertContent = '고객을 등록에 실패했습니다 :('
    },
    onCancelDialog () {
      // TODO : 처음에만 바뀌는거 해결해야됨
      console.log(this.inputName)
      this.inputName = '?'
      console.log(this.inputName)
    }
  },
  async mounted () {
    const { data: datas } = await axios.get('http://localhost:5000/api/customers')
    let totalMoney = 0
    let totalPaybackMoney = 0
    datas.map(data => {
      data.date_updated = getISODate(data.date_updated)
      data.date_created = getISODate(data.date_created)
      totalMoney += data.total_money
      totalPaybackMoney += data.total_payback_money
      data.total_money = data.total_money.toLocaleString() + '원'
      data.total_payback_money = data.total_payback_money.toLocaleString() + '원'
    })
    this.datas = datas
    this.totalWaitMoney = (totalMoney - totalPaybackMoney).toLocaleString() + '원'
    this.totalMoney = totalMoney.toLocaleString() + '원'
    this.totalPaybackMoney = totalPaybackMoney.toLocaleString() + '원'
  }
}

</script>
