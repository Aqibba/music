<template>
  <div class="player" v-show="playlist.length>0">
    <!-- 展开的播放器 -->
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i :class="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
    <!-- 收起的播放器 -->
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :class="cdCls" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    cdCls () {
      return this.playing ? 'play' : ''
    },
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'cerrentIndex'
    ])
  },
  methods: {
    // 下一首
    next () {
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
    },
    // 上一首
    prev () {
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
    },
    // 播放键
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    // 关闭播放器, 变成比不的小型的播放器
    back () {
      this.setFullScreen(false)
    },
    // 展开小播放器, 变成大的播放器
    open () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong () {
      // DOM 渲染后在执行这个播放操作
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (nowPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        nowPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
@import "../../common/styles/variable"
@import "../../common/styles/mixin"

.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(1.25rem)
    .top
      position: relative
      margin-bottom: 1.5625rem
      .back
        position absolute
        top: 0
        left: 0.375rem
        z-index: 50
        .icon-back
          display: block
          padding: 0.5625rem
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 2.5rem
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 1.25rem
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position: fixed
      width: 100%
      top: 5rem
      bottom: 10.625rem
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          box-sizing: border-box
          height: 100%
          .cd
            width: 100%
            height: 100%
            border-radius: 50%
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              box-sizing: border-box
              border-radius: 50%
              border: 0.625rem solid rgba(255, 255, 255, 0.1)
            .play
              animation: rotate 20s linear infinite
        .playing-lyric-wrapper
          width: 80%
          margin: 1.875rem auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 1.25rem
            line-height: 1.25rem
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 2rem
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
          .pure-music
            padding-top: 50%
            line-height: 2rem
            color: $color-text-l
            font-size: $font-size-medium
    .bottom
      position: absolute
      bottom: 3.125rem
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 0.25rem
          width: 0.5rem
          height: 0.5rem
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 1.25rem
            border-radius: 0.3125rem
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0 auto
        padding: 0.625rem 0
        .time
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 1.875rem
          line-height: 1.875rem
          width: 1.875rem
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 1.875rem
        .i-left
          text-align: right
        .i-center
          padding: 0 1.25rem
          text-align: center
          i
            font-size: 2.5rem
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 3.75rem
    background: $color-highlight-background
    .icon
      flex: 0 0 2.5rem
      width: 2.5rem
      height: 2.5rem
      padding: 0 0.625rem 0 1.25rem
      .imgWrapper
        height: 100%
        width: 100%
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 1.25rem
      overflow: hidden
      .name
        margin-bottom: 0.125rem
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 1.875rem
      width: 1.875rem
      padding: 0 0.625rem
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 1.875rem
        color: $color-theme-d
      .icon-mini
        font-size: 2rem
        // position: absolute
        // left: 0
        // top: 0

@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
