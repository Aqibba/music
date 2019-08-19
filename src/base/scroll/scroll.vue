<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    // 滚动的位置
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted () {
    // 在页面的DOM已经渲染完成以后执行初始化滚动的操作
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    // 初始化滚动
    _initScroll () {
      // 当wrapper中没有值得时候,立即停止这个操作
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
    disable () {
      this.scroll && this.scroll.disable()
    },
    // 启用 better-scroll
    enable () {
      this.scroll && this.scroll.enable()
    },
    // 重新计算 better-scroll, 计算高度
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  // 监听data中的变化
  watch: {
    data () {
      // 如果data中的数据发生了变化就重新计算scroll的高度
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
