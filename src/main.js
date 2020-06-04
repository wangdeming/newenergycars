// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import chinaMap from './asset/china.js'
import worldMap from './asset/world.js'
Vue.config.productionTip = false
Vue.component('chart', ECharts)
Vue.prototype.$echarts = echarts
ECharts.registerMap('china', chinaMap)
ECharts.registerMap('world', worldMap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
