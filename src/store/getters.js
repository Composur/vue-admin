const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  //  language: state => state.app.language,
  language: state => state.app.language,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routerTable:state=> state.user.router
}
export default getters
