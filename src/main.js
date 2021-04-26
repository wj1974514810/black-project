import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.less'

import router from '@/router/index.js'

// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);
import { Toast, Icon, Uploader, Dialog, Field, ActionSheet, Tab, Tabs, List, PullRefresh, SwipeCell, Button } from 'vant'
Vue.use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(SwipeCell)
  .use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
