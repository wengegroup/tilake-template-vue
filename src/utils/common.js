/*
 * @Description:常用js封装
 * @Version: 1.0.0
 * @Date: 2021-01-05 09:30:11
 */
const common = {
  /**
   * @description: 文件流下载封装
   * @param { res } 二进制文件流，必传
   * @param { type } 下载文件类型，必传
   * @param { fileExtension } 文件后缀名，必传
   * @param { name} 文件名称，非必传
   * @return {*}
   */
  exportFile(res, type, fileExtension, name) {
    const content = res
    const blob = new Blob([content], { type: type })
    var timestamp = Date.parse(new Date()) // 默认文件名为时间戳
    const fileName = name ? name + fileExtension : timestamp + fileExtension
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  },
  /**
   * @description: 生成唯一ID
   * @param {*}
   * @return {*}
   */
  guid() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
  },
  /**
   * @description: a标签下载文件
   * @param {*} url
   * @return {*}
   */
  downloadDom(url) {
    const downloadDom = document.createElement('a')
    downloadDom.setAttribute('download', '')
    downloadDom.setAttribute('href', url)
    downloadDom.click()
  },
  /**
   * @description: 正则获取字符串中（）里内容
   * @param {*} str
   * @return {Arrary}
   */
  getExecStrs(str) {
    var reg = /\((.+?)\)/g
    var list = []
    var result = null
    do {
      result = reg.exec(str)
      result && list.push(result[1])
    } while (result)
    return list
  },
  /**
   * @description: 换肤加class函数
   * @param {*}
   * @return {*}
   */
  toggleClass(element, className) {
    if (!element || !className) return
    element.className = className
  },
  /**
   * @description: rgb和十六进制的转换
   * @param {*}
   * @return {*}
   */
  colorRgb(color) {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 把颜色值变成小写
    if (reg.test(color.toLowerCase())) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        var colorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
        }
        color = colorNew
      }
      // 处理六位的颜色值，转为RGB
      var colorChange = []
      for (var j = 1; j < 7; j += 2) {
        colorChange.push(parseInt('0x' + color.slice(j, j + 2)))
      }
      return colorChange
    // return 'RGB(' + colorChange.join(',') + ')'
    } else {
      return color
    }
  }
}

export default common
