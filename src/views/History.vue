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
        </v-data-table>
    </div>
</template>

<style>
    .histories {
        padding: 4%;
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
      datas: []
    }
  },
  async mounted () {
    const { data: histories } = await axios.get('http://localhost:5000/api/histories')
    histories.map(history => {
      history.date_created = getISODate(history.date_created)
      history.type = history.type ? '상환' : '대출'
      if (!history.memo) history.memo = 'X'
    })
    this.datas = histories
  }
}
</script>
