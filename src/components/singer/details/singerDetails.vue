<template>
  <transition name="slide" :appear="true">
    <!-- <div class="singer-detail"></div> -->
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
    <!-- <music-list></music-list> -->
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../../api/singer.js'
import { ERR_OK } from '../../../api/config.js'
import { createSong } from '../../../common/js/songs.js'
import MusicList from '../../musicList/musicList.vue'

export default {
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this.getDetails()
    // console.log(this.singer)
  },
  methods: {
    getDetails () {
      // 当获取不到id的时候直接退回到歌手列表
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      // 当有得到id的时候就在进行下一步判断
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.normailSongs(res.data.list)
          // console.log(this.songs)
        }
      })
    },
    normailSongs (list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        // 传入必须的参数songid和albummid来确定这个歌手的歌曲
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped="scoped">
@import "../../../common/styles/variable";

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
