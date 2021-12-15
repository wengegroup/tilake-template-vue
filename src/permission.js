import router from './router'
import { asyncRoutes } from '@/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  let userData = store.getters.userData
  if (userData === '') {
    await store.dispatch('user/getInfo')
    userData = store.getters.userData
    // const permList = userData.permList //后台路由
    const permList = asyncRoutes // 本地路由
    const accessRoutes = await store.dispatch('permission/generateRoutes', permList)
    router.addRoutes(accessRoutes)
    next({ ...to, replace: true })
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
