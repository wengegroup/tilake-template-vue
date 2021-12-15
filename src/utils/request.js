import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    console.log(config)
    if (config.proxyMode){
      config.baseURL = config.proxyMode
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      Message.closeAll()
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message.closeAll()
    if (error.response || error.message.cancel) {
      switch (error.response.status) {
        case 401:
          Message({
            message: '会话过期，请重新登录！',
            type: 'error',
            duration: 2 * 1000
          })
          setTimeout(() => {
            window.location.href = error.response.headers.redirecturl
          }, 2200)
          return
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
