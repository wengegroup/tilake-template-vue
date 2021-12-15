const getters = {
  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  theme: state => state.app.theme,
  themeColor: state => state.app.themeColor,
  layoutMode: state => state.app.layoutMode,
  // user
  userData: state => state.user.userData,
  token: state => state.user.token,
  permission_routes: state => state.permission.routes
}
export default getters
