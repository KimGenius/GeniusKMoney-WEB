<template>
    <div class="customers">
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
      totalWaitMoney: 0
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
