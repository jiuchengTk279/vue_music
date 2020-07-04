<template>
  <transition name="slide">
    <MusicList :songs="songs" :title="title" :bgImage="bgImage"></MusicList>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
// eslint-disable-next-line standard/object-curly-even-spacing
// import { createSong } from '../../common/js/song'
import MusicList from '../music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  comments: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    // console.log(this.singer)
    this._getDetail()
  },
  methods: {
    // 获取歌手详情数据
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    // 初始化列表数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(this.createSong(musicData))
        }
      })
    }
    // createSong(musicData) {
    //   // eslint-disable-next-line no-undef
    //   return new Song({
    //     id: musicData.songid,
    //     mid: musicData.songmid,
    //     // eslint-disable-next-line no-undef
    //     singer: this.filterSinger(musicData.singer),
    //     name: musicData.songname,
    //     album: musicData.albumname,
    //     duration: musicData.interval,
    //     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    //     url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    //   })
    // },
    // filterSinger(singer) {
    //   let ret = []
    //   if (!singer) {
    //     return ''
    //   }
    //   singer.forEach((s) => {
    //     ret.push(s.name)
    //   })
    //   return ret.join('/')
    // }

  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>