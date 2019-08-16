// 引入 jsonp
import originJsonp from 'jsonp'
// 导出jsonp方法
export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // 返回promise
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      // 成功时
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
