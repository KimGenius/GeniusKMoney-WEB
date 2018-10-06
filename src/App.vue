<template>
  <div id="app">
    <div id="nav">
      <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
      <router-link to="/">고객 리스트</router-link> |
      <router-link to="/history">대출/상환 기록</router-link>
      <HistoryChart></HistoryChart>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 5vh 0 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
<script>
import HistoryChart from './components/HistoryChart'
import Vue from 'vue'
import {
  MdButton,
  MdDialogPrompt
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)
Vue.use(MdDialogPrompt)
export default {
  components: { HistoryChart }
}
</script>
