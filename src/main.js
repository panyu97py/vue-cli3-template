import Vue from 'vue'
import App from './App.vue'
import store from "@/store";
import router from '@/router'
import utils from '@/utils'
import api from '@/server/api'
import ElementUI from 'element-ui';
import moment from 'moment'
import '@/components'
import '@/assets/icons'
import '@/styles/element-ui-theme/index.css'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$api = api
Vue.prototype.$moment = moment
console.log(process.env)


new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
