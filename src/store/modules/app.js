import Cookies from 'js-cookie'
import common from '@/utils/common'
const defaultSettings = require('@/settings')

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
    withoutAnimation: false
  },
  device: 'desktop',
  layoutMode: localStorage.getItem(`${defaultSettings.prefix}LayoutMode`) ? localStorage.getItem(`${defaultSettings.prefix}LayoutMode`) : 'transverse',
  theme: localStorage.getItem(`${defaultSettings.prefix}Theme`) ? localStorage.getItem(`${defaultSettings.prefix}Theme`) : 'cyan',
  themeColor: localStorage.getItem(`${defaultSettings.prefix}ThemeColor`) ? localStorage.getItem(`${defaultSettings.prefix}ThemeColor`) : '#169688'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_LAYOUTMODE: (state, layoutMode) => {
    state.layoutMode = layoutMode
    localStorage.setItem(`${defaultSettings.prefix}LayoutMode`, layoutMode)
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_theme: (state, theme) => {
    localStorage.setItem(`${defaultSettings.prefix}Theme`, theme)
    state.theme = theme
  },
  TOGGLE_themeColor(state, val) {
    localStorage.setItem(`${defaultSettings.prefix}ThemeColor`, val)
    state.themeColor = val
  }
}

const actions = {
  toggleLayoutMode({ commit }, layoutMode) {
    commit('TOGGLE_LAYOUTMODE', layoutMode)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleTheme({ commit }, theme) {
    window.changeIcon
    window.document.documentElement.setAttribute(
      'data-theme', theme
    )
    commit('TOGGLE_theme', theme)
  },
  toggleThemeColor({ commit }, color) {
    commit('TOGGLE_themeColor', color)
    const rgb = common.colorRgb(color)
    window.document.documentElement.setAttribute(
      'style', `--themeColor: ${color};
      --themeTransparent:rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.16)`
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
