<template>
    <div class="customers">
        <!--TODO: billboard 차트 들어가야함-->
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
                <td class="text-xs-left">{{ dㅅata.item.date_updated }}</td>
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
  async mounted () {
    const { data } = await axios.get('http://localhost:5000/api/customers')
    this.datas = data
  }
}
</script>
