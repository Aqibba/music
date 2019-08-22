export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
// 歌手对应的音乐
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `https://ws.stream.qqmusic.qq.music/${musicData.songid}.m4a?fromtag=46`
  })
}
// 歌手页面
function filterSinger (singer) {
  let ret = []
  // 不是在歌手页面刷新页面时返回歌手页面
  if (!singer) {
    return ''
  }
  // 遍历歌手, 如果一首歌是两个人演唱用 / 分割
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
