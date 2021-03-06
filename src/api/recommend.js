import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

// 获取轮播图
export function getRecommend () {
  // const url = '/api/getRecommend'
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'jsonp'
  })
  return jsonp(url, data, options)
}

// 获取歌单列表
export function getDiscList () {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
