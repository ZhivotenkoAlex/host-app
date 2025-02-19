<template>
  <div id="app">
    <h1>Micro-Frontend Demo</h1>
    <MainMenu />
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue"

export default {
  name: "AppRoot",
  components: {
    MainMenu,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
