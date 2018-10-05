<template>
    <div class="histories">
        <div id="TimeseriesChart"></div>
        <v-data-table
                :headers="headers"
                :items="datas"
                hide-actions
                class="elevation-1">
            <template slot="items" slot-scope="data">
                <td class="text-xs-left">{{ data.item.idx }}</td>
                <td class="text-xs-left">{{ data.item.name }}</td>
                <td class="text-xs-left">{{ data.item.type }}</td>
                <td class="text-xs-left">{{ data.item.money }}</td>
                <td class="text-xs-left">{{ data.item.memo }}</td>
                <td class="text-xs-left">{{ data.item.date_created }}</td>
            </template>
            <template slot="footer">
                <td colspan="100%">
                    <strong>총 거래 금액 : {{ totalMoney }}</strong>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<style>
    .histories {
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
        { text: '고유값', value: 'idx' },
        { text: '이름', value: 'name' },
        { text: '타입', value: 'type' },
        { text: '금액', value: 'money' },
        { text: '메모', value: 'memo' },
        { text: '생성일', value: 'dateCreated' }
      ],
      datas: [],
      totalMoney: 0
    }
  },
  async mounted () {
    const { data: histories } = await axios.get('http://localhost:5000/api/histories')
    let totalMoney = 0
    histories.map(history => {
      history.date_created = getISODate(history.date_created)
      history.type = history.type ? '상환' : '대출'
      if (!history.memo) history.memo = 'X'
      totalMoney += history.money
      history.money = history.money.toLocaleString() + '원'
    })
    this.datas = histories
    this.totalMoney = totalMoney.toLocaleString() + '원'
  }
}
</script>
