import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.less'

import router from '@/router/index.js'

// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
