import jsonp from '../common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: undefined,
    pagenum: 1,
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    platform: 'jqspaframe.json',
    inCharset: 'GB2312'
  })
  return jsonp(url, data, options)
}
