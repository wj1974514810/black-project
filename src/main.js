import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.less'

import router from '@/router/index.js'

// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);
import { Toast, Icon } from 'vant'
Vue.use(Toast)
  .use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
