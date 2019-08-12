<template>
  <div id="app">
    <m-header></m-header>
    <router-view />
  </div>
</template>

<script>
import MHeader from './components/header/header'
export default {
  name: 'App',
  components: {
    MHeader
  }
}
</script>

<style lang="stylus">
</style>
