import Vue from 'vue'


import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import moment from 'moment'//导入文件 
import permission from './components/Permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import dict from './components/Dict'
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'
import './assets/styles/normalize.css'
import App from './App'
import router from './router/routers'
import store from './store'
import 'lib-flexible/flexible.js'
// 数据字典


import '@/icons' // icon
//import '@/permission' // permission control
import './router/index' // permission control

import "../static/icon/iconfont.css"

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(dict)
Vue.use(permission)
Vue.config.productionTip = false

moment.locale('zh-cn');
Vue.prototype.$moment = moment; //时间处理


//落地页环境，editor:编辑模式，product:预览或生产环境(事件响应有效)
window.landpage_env='editor'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
