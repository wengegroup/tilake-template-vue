// import { getInfo } from '@/api/user'
import { getToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userData: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, data) => {
    state.userData = data
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 不接sso
      const data = {
        useId: 555
      }
      commit('SET_USER', data)
      resolve(data)
      // 接sso
      // getInfo().then(response => {
      //   const { data } = response
      //   if (!data) {
      //     reject(response)
      //   }else{
      //     commit('SET_USER', data[0])
      //     resolve(data)
      //   }
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
