<template>
  <div class="m-header">
    <!-- <div class="icon"></div> -->
    <div class="text">The Music</div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import "../../common/styles/variable"
@import "../../common/styles/mixin"
.m-header
  position relative
  height 2.75rem
  text-align center
  color $color-theme
  font-size 0
  .icon
    display inline-block
    vertical-align top
    margin-top 0.375rem
    width 1.875rem
    height 2rem
    margin-right 0.5625rem
    // bg-image ('logo')
    background-size 1.875rem 2rem
  .text
    display inline-block
    vertical-align top
    line-height 2.75rem
    font-size $font-size-large
  .mine
    position absolute
    top 0
    right 0
    .icon-mine
      display block
      padding 0.75rem
      font-size 1.25rem
      color $color-theme
</style>
