import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons' // 图标
import './utils/permission' // 全局权限处理
import '@/styles/index.scss' // 全局样式
import UserCenterComponent from '@/components/index'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.use(UserCenterComponent)// 全局组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$echarts = echarts
