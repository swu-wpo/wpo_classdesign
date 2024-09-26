import Cookie from 'js-cookie'
const TokenKey = 'feed_system_manage_user'
const isLogin = 'login_status'
const userInfo = 'user'
export const getToken = () => {
  return Cookie.get(TokenKey)
}
export const setToken = (token) => {
  return Cookie.set(TokenKey, token)
}
export const removeToken = () => {
  return Cookie.remove(TokenKey)
}

export const setLoginStatus = (loginStatus) => {
  return Cookie.set(isLogin, loginStatus)
}
export const getLoginStatus = () => {
  return Cookie.get(isLogin)
}

export const setUserInfo = (user) => {
  return Cookie.set(userInfo, user)
}
export const getUserInfo = () => {
  return Cookie.get(userInfo)
}
