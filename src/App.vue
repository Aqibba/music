<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view />
  </div>
</template>

<script>
import MHeader from './components/header/header'
import Tab from './components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus">
</style>
