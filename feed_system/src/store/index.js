import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import permission from './modules/permission'
import userInfo from './modules/userInfo'
import appInfo from './modules/app'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters,
  modules: {
    permission,
    userInfo,
    appInfo
  }
})
