// 依赖区域
import Vue from 'vue'
import App from './App'
import router from './router'

// 网络层
import './shared/ajax'

// UI层
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
