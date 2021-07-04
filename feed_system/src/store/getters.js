const getters = {
  addRouters: state => state.permission.addRouters,
  auths: state => state.userInfo.auths,
  buttons: state => state.permission.buttonAuths,
  sidebar: state => state.appInfo.collapsed
}
export default getters
