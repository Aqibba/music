<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"></h1>
    <div class="bg-image">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
@import '../../common/styles/variable'
// @import '../../common/styles/mixin'

.song-list
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 4rem
    font-size: $font-size-medium
    .rank
      flex: 0 0 1.5625rem
      width: 1.5625rem
      margin-right: 1.875rem
      text-align: center
      .icon
        display: inline-block
        width: 1.5625rem
        height: 1.5rem
        background-size: 1.5625rem 1.5rem
        &.icon0
          bg-image('first')
        &.icon1
          bg-image('second')
        &.icon2
          bg-image('third')
      .text
        color: $color-theme
        font-size: $font-size-large
    .content
      flex: 1
      line-height: 1.25rem
      overflow: hidden
      .name
        no-wrap()
        color: $color-text
      .desc
        no-wrap()
        margin-top: 0.25rem
        color: $color-text-d
</style>
