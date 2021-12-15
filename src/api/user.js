import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/ssoapplogout',
    method: 'get'
  })
}

// 获取用户权限
export function getInfo() {
  return request({
    url: '/user/getUserPerm',
    method: 'post'
  })
}
// 预览
export function loadJquery() {
  return request({
    url: '',
    method: 'get',
    proxyMode:'http://192.168.10.165:10719/'
  })
}
