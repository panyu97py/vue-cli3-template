import $router from '@/router'
export default {
    state: {
        userInfo: null
    },
    getters: {
        userInfo: state => state.userInfo
    },
    mutations: {},
    actions: {
        loginOut() {
            $router.push({name:'user'})
        }
    }
}
