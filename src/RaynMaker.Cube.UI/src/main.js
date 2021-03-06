import Vue from 'vue'
import App from './App'
import router from './router'

$.ajaxSetup({ cache: false })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./assets/css/site.css')
require('./assets/js/site.js')
