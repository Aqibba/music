<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle">
      <div class="filter"></div>
    </div>
    <scroll :data="songs">
        <div class="song-list-wrapper">
          <song-list :songs="songs"></song-list>
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../base/scroll/scroll.vue'
import SongList from '../../base/songList/songList.vue'

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
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  components: {
    Scroll,
    SongList
  }
}
</script>

<style lang="stylus" scoped="scoped">
@import '../../common/styles/variable'
@import '../../common/styles/mixin'

.music-list
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
  .back
    position absolute
    top: 0
    left: 0.375rem
    z-index: 50
    .icon-back
      display: block
      padding: 0.625rem
      font-size: $font-size-large-x
      color: $color-theme
  .title
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 2.5rem
    font-size: $font-size-large
    color: $color-text
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover
    .play-wrapper
      position: absolute
      bottom: 1.25rem
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 8.4375rem
        padding: 0.4375rem 0
        margin: 0 auto
        text-align: center
        border: 0.0625rem solid $color-theme
        color: $color-theme
        border-radius: 6.25rem
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 0.375rem
          font-size: $font-size-medium-x
        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    .song-list-wrapper
      padding: 1.25rem 1.875rem
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
