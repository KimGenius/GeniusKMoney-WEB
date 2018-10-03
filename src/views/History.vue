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
                <td class="text-xs-left">{{ data.item.dateCreated }}</td>
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
      datas: [{
        idx: 1,
        name: 'Test',
        type: '1', // 1 갚을때, 2 빌릴때
        money: 1234124,
        memo: '너는 누구냐',
        dateCreated: '오늘'
      }]
    }
  }
}
</script>
