import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/assetPool',
    children: [{
      path: 'assetPool',
      name: 'AssetPool',
      component: 'assetPool/index',
      meta: { title: '资产库', icon: 'iconassetPool' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/shareMaterial',
    children: [{
      path: 'shareMaterial',
      name: 'ShareMaterial',
      component: 'shareMaterial/index',
      meta: { title: '公共素材', icon: 'iconshareMaterial' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/myUpload',
    meta: { title: '个人素材', icon: 'iconmy' },
    children: [
      {
        path: 'myUpload',
        name: 'MyUpload',
        component: 'myMaterial/myUpload/index',
        meta: { title: '我的素材' }
      },
      {
        path: 'myCollection',
        name: 'MyCollection',
        component: 'myMaterial/myCollection/index',
        meta: { title: '我的收藏' }
      }
    ]
  },
  {
    path: '/myTest',
    component: Layout,
    redirect: '/myTest',
    meta: { title: '测试路由', icon: 'iconmy' },
    children: [
      {
        path: 'myA',
        name: 'MyA',
        component: 'myTest/myA/index',
        meta: { title: '我的素材1' }
      },
      {
        path: 'myB',
        name: 'myB',
        component: 'myTest/myB/index',
        meta: { title: '我的收藏1' }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base:'/space',
  // mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: []
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
