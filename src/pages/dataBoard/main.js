import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/reset.css'
import Echarts from 'echarts'
import request from './request'

Vue.config.productionTip = false

Vue.prototype.$echarts = Echarts
Vue.prototype.$request = request

new Vue({
  render: h => h(App),
}).$mount('#app')
