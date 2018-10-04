<template>
    <div class="customers">
        <div id="TimeseriesChart"></div>
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
                <td class="text-xs-left">{{ data.item.trust_percent }}</td>
                <!--TODO: date 보기 쉽게 수정-->
                <td class="text-xs-left">{{ data.item.date_updated }}</td>
                <td class="text-xs-left">{{ data.item.date_created }}</td>
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
import { bb } from 'billboard.js'

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
        { text: '신용도 (%)', value: 'trustPercent' },
        { text: '마지막 업데이트', value: 'dateUpdated' },
        { text: '첫 대여 일시', value: 'dateCreated' }
      ],
      datas: []
    }
  },
  async beforeCreate () {
    const { datas } = await axios.get('http://localhost:5000/api/customers')
    this.datas = datas
    console.log(datas)
    console.log(this.datas)
    const columnsHeader = ['x']
    const columnsMoney = ['빌린 금액']
    const columnsPayback = ['갚은 금액']
    for (const data of datas) {
      columnsHeader.push(data.date_updated.toString())
      columnsMoney.push(data.total_money)
      columnsPayback.push(data.total_payback_money)
    }
    console.log(columnsHeader, columnsMoney, columnsPayback)
    const chart = bb.generate({
      data: {
        x: 'x',
        columns: [
          columnsHeader,
          columnsMoney
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      },
      bindto: '#TimeseriesChart'
    })

    setTimeout(function () {
      chart.load({
        columns: [
          columnsPayback
        ]
      })
    }, 1000)
  }
}

</script>
