<template>
  <div class="loading">
    <img width="24" height="24" src="../../assets/images/loading.gif">
    <p class="desc">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/styles/variable"

.loading
  width: 100%
  text-align: center
  .desc
    line-height: 1.25rem
    font-size: $font-size-small
    color: $color-text-l
</style>
