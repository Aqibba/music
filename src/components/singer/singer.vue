<template>
  <div class="singer">
    <list-view :data="singerList" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '../../api/singer.js'
import { ERR_OK } from '../../api/config.js'
import Loading from '../../base/loading/loading.vue'
import Singer from '../../common/js/singer.js'
import ListView from './singerList/listview.vue'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this._getSinger()
  },
  methods: {
    // 跳转相应的歌手详情
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this._setSinger(singer)
    },
    // 得到歌手列表
    _getSinger () {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this.setSinger(res.data.list)
          // console.log('================')
          // console.log(this.setSinger(this.singerList))
          // console.log('================')
        }
      })
    },
    // 将得到的singer数据重新规范,
    setSinger (singerList) {
      // 热门数据
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 遍历得到的singer数据
      singerList.forEach((item, index) => {
        // 将得到的10条之内的数据添加进map的item中作为热门的歌手数据
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        // 根据得到的数据中的Findex做 A-Z 的排序
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // console.log(map)
      // 按照 热门 A-Z 的方式排序
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        // console.log(val)
        // console.log(val.title)
        // console.log('val.title     ' + typeof (val.title))
        if (val.title === HOT_NAME) {
          // debugger
          hot.push(val)
        } else {
          ret.push(val)
        }
      }
      // 排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    // 映射
    ...mapMutations({
      _setSinger: 'SET_SINGER'
    })
  },
  components: {
    Loading,
    ListView
  }
}
</script>

<style lang="stylus" scoped="scoped">
.singer
  position fixed
  top 5.5rem
  bottom 0
  width 100%
</style>
