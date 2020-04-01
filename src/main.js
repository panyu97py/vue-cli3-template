import Vue from 'vue'
import App from './App.vue'
import store from "@/store";
import router from '@/router'
import utils from '@/utils'
import api from '@/server/api'
import ElementUI from 'element-ui';
import '@/components'
import '@/assets/icons'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$api = api
console.log(process.env)


new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
