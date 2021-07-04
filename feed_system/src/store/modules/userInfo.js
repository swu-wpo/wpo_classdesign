import loginApi from '../../apis/login'

const userInfo = {
  state: {
    auths: 'none'
  },
  mutations: {
    SET_AUTHS: (state, auth) => {
      state.auths = auth
    }
  },
  actions: {
    setUserInfo: ({ commit }, roles) => {
      return new Promise((resolve, reject) => {
        commit('SET_AUTHS', roles)
        resolve(roles)
      })
    },
    getUserInfo: ({ commit }) => {
      return new Promise((resolve, reject) => {
        loginApi.getResource().then((res) => {
          commit('SET_AUTHS', res.data)
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
export default userInfo
