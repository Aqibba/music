<template>
  <scroll :data="data" class="listview" ref="listview">
    <ul>
      <li v-for="(group, index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" class="list-group-item" :key="index">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/styles/variable"

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 1.875rem
    .list-group-title
      height: 1.875rem
      line-height: 1.875rem
      padding-left: 1.25rem
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 1.25rem 0 0 1.875rem
      .avatar
        width: 3.125rem
        height: 3.125rem
        border-radius: 50%
      .name
        margin-left: 1.25rem
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 1.25rem
    padding: 1.25rem 0
    border-radius: 0.625rem
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 0.1875rem
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 1.875rem
      line-height: 1.875rem
      padding-left: 1.25rem
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
