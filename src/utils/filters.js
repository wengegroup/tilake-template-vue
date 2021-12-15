/*
 * @Description: 通用过滤器
 * @Version: 1.0.0
 * @Date: 2021-01-07 16:39:18
 */
import moment from 'moment'

// 储存单位转化
const computedSize = bytes => {
  if (bytes === 0 || !bytes) return '0 B'
  var k = 1024 // or 1024
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

// 时间戳转化
const filterMoment = (val, formate) => {
  return moment(val).format(formate)
}

// 截取.文件名前的字符串
const filterFileFormat = fileName => {
  if (fileName.includes('.')) {
    // 获取最后一个.的位置
    const index = fileName.lastIndexOf('.')
    // 获取前缀
    return fileName.substr(0, index)
  } else {
    return fileName
  }
}

export { computedSize, filterMoment, filterFileFormat }
