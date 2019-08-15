<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper"></div>
      <div class="recommend-list"><h1 class="list-title">热门歌单推荐</h1></div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from '../../api/recommend.js'
import { ERR_OK } from '../../api/config.js'
export default {
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/styles/variable'

.recommend
  position fixed
  width 100%
  top 5.5rem
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 4.1rem
        line-height 4.1rem
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 1.25rem 1.25rem 1.25rem
        .icon
          flex 0 0 3.75rem
          width 3.75rem
          padding-right 1.25rem
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 1.25rem
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 0.625rem
            color $color-text
          .desc
            color $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
