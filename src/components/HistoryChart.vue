<template>
    <div id="TimeseriesChart"></div>
</template>

<script>
import axios from 'axios'
import { bb } from 'billboard.js'
import { getISODate } from '../utils/date'
export default {
  name: 'HistoryChart',
  async mounted () {
    const { data: histories } = await axios.get('http://localhost:5000/api/histories')
    histories.reverse()
    const columnsHeader = ['x']
    const columnsMoney = ['빌린 금액']
    const columnsPayback = ['갚은 금액']
    let totalMoney = 0
    let totalPayback = 0
    for (const data of histories) {
      columnsHeader.push(getISODate(data.date_created).substr(0, 10))
      if (data.type === 1) totalPayback += data.money
      else totalMoney += data.money
      columnsMoney.push(totalMoney)
      columnsPayback.push(totalPayback)
    }
    const chart = bb.generate({
      data: {
        x: 'x',
        columns: [
          columnsHeader,
          columnsMoney
        ],
        colors: {
          '빌린 금액': '#fa7171',
          '갚은 금액': '#00c73c'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        },
        y: {
          tick: {
            format: (money) => {
              return money.toLocaleString() + '원'
            }
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
    }, 300)
  }
}
</script>
