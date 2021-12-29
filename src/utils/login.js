import Cookies from 'js-cookie'
import store from '@/store'
import {UrlSearch} from '@/utils/utils'
var service = '';
var defineConfig = {};
import {
  getToken,
  removeToken,
  removeUserInfo,
  setToken,
  setUserInfo,
  getUserInfo
} from '@/utils/auth'
import {ticket,logout} from '@/api/common'

//检验ticket 获取用户信息
async function inspectTicket(paramsToken) {
  let params = {
    service,
    ticket:paramsToken.ticket
  }
  let res = await ticket(params).then(res=>{
    if(res.code == '000000'){
      userInfoStorage(res.data)
    }else if(!store.getters.user['username']){
      return false
    }
    return true
  })
  return res
}

//用户信息存储
async function userInfoStorage(res) {
  setUserInfo(res);
  const accessRoutes = await store.dispatch(
    'user/setUserInfo',
    res
  )
  return true
}

//检验登录
export async function isLogin() {
  defineConfig = store.getters.defineConfig;
  service = defineConfig?.VUE_APP_CURRENT_API;
  console.log(defineConfig)
  let UrlParams = await UrlSearch();
  let paramsToken = UrlParams?.token?.split("#")[0];
  if(paramsToken){
    setToken(paramsToken)
  }
  paramsToken ? '' : paramsToken = getToken()
  const token = await store.dispatch(
    'user/setToken',
    paramsToken
  )
  if(token){
    if(UrlParams.ticket && !store.getters.user['username']){
      let res = await inspectTicket(UrlParams);
      return res
    }else{
      let res = await getUserInfo();
      return res['username']
    }
  }
  return false
}

//页面重定向到登录
export function redirect() {
  defineConfig = store.getters.defineConfig;
  service = defineConfig?.VUE_APP_CURRENT_API;
  removeToken();
  removeUserInfo();
  console.log(defineConfig.VUE_APP_WEB_API+'/v1/cas/login?service='+service)
  refreshParentLogin()
  // window.location.href = defineConfig.VUE_APP_WEB_API+'/v1/cas/login?service='+service;
}

// 页面以iframe的方式的嵌入到其他页面后,想刷新父组件页面url,调用此方法
export function refreshParentLogin(){
    window.parent.postMessage({
      cmd: "refreshLogin",
      params: {
        // success: true,
        // data: document.body.scrollHeight + "px",
      },
    },
      "*"
    );
}

//退出登录
export function signout() {
  let params = {service};
  logout(params).then(res=>{
    if(res.code == "SUCCESS"){
      removeToken();
      removeUserInfo();
      redirect()
    }
  })
}
