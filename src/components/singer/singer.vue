<template>
    <div class="singer">
        <ListView @select="selectSinger" :data="singers" ></ListView>
        <!-- 承载子路由 :id  singer-detail 歌手详情页-->
        <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Singer from '../../common/js/singer'
import ListView from '../../base/listview/listview'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    // 调用获取歌手列表
    this._getSingerList()
  },
  methods: {
    //  选择歌手列表中的歌手
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    // 获取歌手列表数据
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        //   console.log(this._normalizeSinger(this.singers))
        }
      })
    },
    // 初始化歌手列表数据
    _normalizeSinger(list) {
      let map = {
        //  热门歌手
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
        //   map.hot.items.push({
        //     id: item.Fsinger_mid,
        //     name: item.Fsinger_name,
        //     avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
        //   })
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        // map[key].items.push({
        //   id: item.Fsinger_mid,
        //   name: item.Fsinger_name,
        //   avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
        // })
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      console.log(map)
      // 为了得到有序列表，需要处理 map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          ret.push(val)
        }
      }
      // 升序排列，从 a - z，得到一维数组
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    // 对 Mutations 的一层包装，是语法糖，提交 Mutations 中的方法同步修改 state 中的数据
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// better-scroll 的使用，父元素的高度固定，子元素的高度撑开
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>