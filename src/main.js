import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.less'

import router from '@/router/index.js'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
