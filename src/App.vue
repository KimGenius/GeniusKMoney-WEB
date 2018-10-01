<template>
  <div id="app">
    <div id="nav">
      <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
      <router-link to="/">고객 리스트</router-link> |
      <router-link to="/history">대출/상환 기록</router-link>
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
