import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '@/assets/css/theme#2E008B.css'
import router from '@/utils/router'
import filters from '@/utils/filter'
import request from '@/utils/request.js'
import store from '@/utils/store'
import directives from '@/utils/directives'

Vue.use(ElementUI);
Vue.config.productionTip = false

Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})

Vue.prototype.$request = request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')