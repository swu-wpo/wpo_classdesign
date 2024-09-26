const appInfo = {
  state: {
    collapsed: false
  },
  mutations: {
    SET_COLLAPSED: (state, status) => {
      state.collapsed = !status
    }
  },
  actions: {
    setCollapsed: ({ commit }, state) => {
      commit('SET_COLLAPSED', state)
    }
  }
}
export default appInfo
