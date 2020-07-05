import { playMode } from '../common/js/config'

// 基础数据，对于计算而来的数据放在 getters 中
const state = {
  // 歌手
  singer: {},
  // 播放的状态，暂停还是正在播放
  playing: false,
  // 全屏播放
  fullScreen: false,
  // 播放列表
  playList: [],
  // 顺序播放列表
  sequenceList: [],
  // 播放模式，默认顺序
  mode: playMode.sequence,
  // 切换当前播放歌曲的索引
  currentIndex: -1
}

export default state