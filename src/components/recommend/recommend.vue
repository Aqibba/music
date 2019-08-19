<template>
  <div class="recommend" ref="recommend">
    <!-- better-scroll 层级关系是父子级关系 只有第一个子元素能滚动, 同时滚动轮播和热门歌单 -->
    <!-- data的变化会引起页面高度的变化, 调用refresh计算高度才能滚动 -->
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 当recommendList中有值得时候在执行swiper中的mounted中的set -->
        <div v-if="recommendList.length" class="slider-wrapper">
          <!-- 轮播图 -->
          <swiper>
            <!-- 遍历通过jsonp得到的轮播图 -->
            <div v-for="(item, index) of recommendList" :key="index">
              <a href="#"><img :src="item.picUrl" @load="loadImg" class="needsclick" /></a>
            </div>
          </swiper>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item, index) of discList" :key="index">
              <div class="icon"><img v-lazy="item.imgurl" width="60" height="60" /></div>
              <div class="text">
                <h2 class="name" v-html="item.dissname"></h2>
                <p class="desc" v-html="item.creator.name"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '../../api/recommend.js'
import { ERR_OK } from '../../api/config.js'
import Swiper from '../../base/swiper/swiper.vue'
import Scroll from '../../base/scroll/scroll.vue'
import Loading from '../../base/loading/loading.vue'

export default {
  data () {
    return {
      // 轮播图, 推荐歌单
      recommendList: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    // 轮播
    _getRecommend () {
      getRecommend().then(res => {
        // 返回的状态码
        if (res.code === ERR_OK) {
          // console.log(res.data.slider)
          this.recommendList = res.data.slider
        }
      })
    },
    // 推荐歌单
    _getDiscList () {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.discList = res.data.list
        }
      })
    },
    // 加载图片, 确保加载的时候无论是轮播图先加载还是歌单先加载都不会提前计算scroll的高度,只有在全部加载完成以后才进行计算
    loadImg () {
      // 设置标志位
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Swiper,
    Scroll,
    Loading
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
