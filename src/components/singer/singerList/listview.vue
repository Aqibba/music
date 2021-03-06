<template>
  <scroll @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" :data="data" class="listview" ref="listview">
    <ul>
      <!-- data 中的数据是 title和items -->
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <uL>
          <!-- 遍历group.items的得到歌手的图片和歌手名 -->
          <!-- 添加点击事件 -->
          <li @click="selectItem(item)" v-for="(item, index) in group.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </uL>
      </li>
    </ul>
    <!-- 右侧的字母排序列表, 绑定手指点击事件 -->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item" :class="{ current: currentIndex === index }">{{ item }}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div v-show="!data.length" class="loading-container"><loading></loading></div>
  </scroll>
</template>

<script>
import Scroll from '../../../base/scroll/scroll'
import Loading from '../../../base/loading/loading'
import { getData } from '../../../common/js/dom'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    shortcutList () {
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  methods: {
    // 派发点击事件, 将点击的元素传出
    selectItem (item) {
      this.$emit('select', item)
    },
    // 点击右侧列表时, 传入点击的字母下标
    onShortcutTouchStart (e) {
      // 得到的当前点击的字母的索引位置
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      // 记录当前这个字母的位置
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      // 滚
      this._scrollTo(anchorIndex)
    },
    // 手指滑动右侧列表进行歌手列表的联动
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 记录滚了多少个字母的位置高度                                向下取整
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      // 滚完之后的字母的位置
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    // 滚动事件
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 计算高度
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    // 滚到哪
    _scrollTo (index) {
      // 右侧首字母导航前后的空白进制点击
      if (!index && index !== 0) {
        return
      }
      // 最上边和最下边的时候就不在滑动
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  // 监听页面全部渲染完毕
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop / 16}rem,0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus">
@import '../../../common/styles/variable'

.listview
  position relative
  width 100%
  height 100%
  overflow hidden
  background $color-background
  .list-group
    padding-bottom 1.875rem
    .list-group-title
      height 1.875rem
      line-height 1.875rem
      padding-left 1.25rem
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    .list-group-item
      display flex
      align-items center
      padding 1.25rem 0 0 1.875rem
      .avatar
        width 3.125rem
        height 3.125rem
        border-radius 50%
      .name
        margin-left 1.25rem
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 50%
    transform translateY(-50%)
    width 1.25rem
    padding 1.25rem 0
    border-radius 0.625rem
    text-align center
    background $color-background-d
    font-family Helvetica
    .item
      padding 0.1875rem
      line-height 1
      color $color-text-l
      font-size $font-size-small
      &.current
        color $color-theme
  .list-fixed
    position absolute
    top 0
    left 0
    width 100%
    .fixed-title
      height 1.875rem
      line-height 1.875rem
      padding-left 1.25rem
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
