const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  //  language: state => state.app.language,
  language: state => state.app.language,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routerTable: state => state.user.router,
  role_id: state => state.user.role_id,
  permission_routes: state => state.permission.routes
}
export default getters
