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
Vue.prototype.$shareTypeList = [
    {label: '哲学', value: '1'},
    {label: '经济学', value: '2'},
    {label: '法学', value: '3'},
    {label: '教育学', value: '4'},
    {label: '文学', value: '5'},
    {label: '历史学', value: '6'},
    {label: '理学', value: '7'},
    {label: '工学', value: '8'},
    {label: '农学', value: '9'},
    {label: '医学', value: '10'},
    {label: '军事学', value: '11'},
    {label: '管理学', value: '12'}
]
console.log(process.env)


new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
