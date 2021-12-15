import { constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutesLayout(routes) {
  const res = []
  routes.forEach(route => {
    if (route.component === 'Layout') {
      route.component = Layout
    } else if (route.component !== '' && typeof (route.component) === 'string') {
      route.component = _import(route.component)
    }
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutesLayout(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  systemRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      roles = filterAsyncRoutesLayout(roles)
      const accessedRoutes = roles.concat(constantRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
