import Vue from 'vue'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 如果需要配合 ECharts 扩展使用，只需要直接引入扩展包即可
// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
// import 'echarts-gl'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import errorHandler from '@/config/errorHandler'

// global css
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang'

import '@/icons' // icon
import '@/permission.js' // permission control
// 全局指令
import directive from '@/directive'
import * as filters from './filters' // global filters
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 注册组件后即可使用
Vue.component('v-chart', ECharts)

// 全局错误处理
Vue.config.errorHandler = errorHandler

Vue.config.warnHandler = function(msg, err, trace) {
  setTimeout(() => {
    errorHandler(msg, err, trace)
  }, 100)
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { i18n })
Vue.use(ElementUI, {
  // size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 全局注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 全局指令
Vue.use(directive)

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
