import { asyncRoutes, constantRoutes } from '@/router'

// 是否有权限
const hasPermission = (route, auths) => {
  if (route.meta && route.meta.id) {
    return auths.some((auth) => auth === route.meta.id)
  } else {
    return true
  }
}
const filterAsyncRoutes = (asyncRouter, auths) => {
  const accessRouter = asyncRouter.filter((route) => {
    if (hasPermission(route, auths)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children, auths)
      }
      return true
    }
    return false
  })
  return accessRouter
}
const permission = {
  state: {
    addRouters: [],
    routers: [],
    buttonAuths: ['100', '200', '300'] // 按钮权限

  },
  mutations: {
    SET_ROUTES: (state, routers) => {
      state.addRouters = (routers)
      state.routers = constantRoutes.concat(routers)
    },
    SET_BTNAUTHS: (state, auths) => {
      state.buttonAuths = auths
    }
  },
  actions: {
    generateRouters: ({ commit }, auths) => {
      return new Promise((resolve, reject) => {
        let accessRoutes
        if (auths && auths.length > 0) {
          accessRoutes = filterAsyncRoutes(asyncRoutes, auths)
          // console.log(accessRoutes)
        } else {
          accessRoutes = []
        }
        commit('SET_ROUTES', accessRoutes)
        resolve(accessRoutes)
      })
    },
    setButtonAuths: ({ commit }, auths) => {
      commit('SET_BTNAUTHS', auths)
      return new Promise((resolve, reject) => {
        resolve(auths)
      })
    }
  }
}
export default permission
