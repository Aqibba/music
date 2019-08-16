<template>
<div class="slider" ref="slider">
  <div class="slider-group" ref="sliderGroup">
    <slot></slot>
  </div>
  <div class="dots">
    <!-- 循环遍历小圆点, 当前的小圆点的下标就是当前图片的下标 -->
    <span v-for="(item, index) of dots" :key="index" class="dot" :class="{active: currentIndex === index}"></span>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '../../common/js/dom'

export default {
  name: 'swpier',
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  // 封装轮播组件
  props: {
    // 会否可以循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 自动轮播
    autoplay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted () {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
      if (this.autoplay) {
        this.play()
      }
    }, 20)
  },
  methods: {
    // 设置横向滚动轮播的宽度
    setSliderWidth () {
      // 获取整个轮播中一共有多少张图片
      this.children = this.$refs.sliderGroup.children
      // 设置整个轮播组的宽度
      // 定义width设置轮播图的总的宽度
      let width = 0
      // 获取单个轮播图的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // console.log(sliderWidth)
      // 遍历轮播组中的每一个子元素
      for (let i = 0; i < this.children.length; i++) {
        // 获取每一个子元素
        let child = this.children[i]
        // 添加编写好的slider-item 类
        addClass(child, 'slider-item')
        // 轮播组中的图片宽度就是轮播组的宽度
        child.style.width = sliderWidth / 16 + 'rem'
        // group轮播组的总的宽度
        width += sliderWidth
      }
      // 当进行无缝循环轮播时这张正在显示的图片左右都会有,所以宽度也是两倍
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width / 16 + 'rem'
    },
    // 初始化轮播图
    initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        // 横向滚动, 纵向不可滚动
        scrollX: true,
        scrollY: false,
        // 滑动惯性
        momentum: false,
        snap: {
          // 无缝滚动
          loop: this.loop,
          // 用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          threshold: 0.4,
          // 轮播切换的动画时间
          speed: 400
        },
        click: false
      })
      // 当滚动结束时小圆点变成长条
      this.slider.on('scrollEnd', () => {
        // 当前页
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentIndex = pageIndex
        // 清除上一次的定时器在执行下一次
        if (this.autoplay) {
          clearTimeout(this.timer)
          this.play()
        }
      })
    },
    // 初始化轮播图上的小圆点
    initDots () {
      // 小圆点的个数等于轮播图中图片的数量
      this.dots = new Array(this.children.length)
    },
    // 自动轮播
    play () {
      // let pageIndex = this.currentIndex + 1
      // console.log(pageIndex)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
@import '../../common/styles/variable'

.slider
  min-height 0.0625rem
  .slider-group
    position relative
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
      img
        display block
        width 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 0.75rem
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 0.25rem
      width 0.5rem
      height 0.5rem
      border-radius 50%
      background $color-text-l
      &.active
        width 1.25rem
        border-radius 0.3125rem
        background $color-text-ll
</style>
