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
                <td class="text-xs-left">{{ data.item.totalMoney }}</td>
                <td class="text-xs-left">{{ data.item.totalPaybackMoney }}</td>
                <td class="text-xs-left">{{ data.item.trustPercent }}</td>
                <td class="text-xs-left">{{ data.item.dateUpdated }}</td>
                <td class="text-xs-left">{{ data.item.dateCreated }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<style>
    .customers {
        padding: 4%;
    }
</style>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      test: null,
      headers: [
        {
          text: '고유값',
          value: 'idx'
        },
        { text: '이름', value: 'name' },
        { text: '총 빌린 금액(원)', value: 'totalMoney' },
        { text: '총 갚은 금액(원)', value: 'totalPaybackMoney' },
        { text: '신용도 (%)', value: 'trustPercent' },
        { text: '마지막 업데이트', value: 'dateUpdated' },
        { text: '첫 대여 일시', value: 'dateCreated' }
      ],
      datas: [
        {
          idx: 1,
          name: '테스트1',
          totalMoney: '60,000',
          totalPaybackMoney: '0',
          trustPercent: '0%',
          dateCreated: '2018-09-26 20:04:11',
          dateUpdated: '2018-09-26 20:04:11'
        },
        {
          idx: 2,
          name: '테스트2',
          totalMoney: '90,000',
          totalPaybackMoney: '10,000',
          trustPercent: '9%',
          dateCreated: '2018-09-26 20:04:11',
          dateUpdated: '2018-09-26 20:04:11'
        }
      ]
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.test = response))
  }
}
</script>
