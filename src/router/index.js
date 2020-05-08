import Vue from 'vue'
import Router from 'vue-router'
import routerMap from './routerMap'
import $store from '@/store'
import {Notification} from "element-ui";

Vue.use(Router)

/**
 * 初始化路由
 * @type {VueRouter}
 */
const router = new Router({
    routes: routerMap
})
const userRouterName = ['login', 'register', 'user']
/**
 * 路由守卫
 */
router.beforeEach(async (to, from, next) => {
    const oauthInfoFromLocal = localStorage.getItem('oauthInfo') ? JSON.parse(localStorage.getItem('oauthInfo')) : null
    if (!$store.getters.isLogin && oauthInfoFromLocal) {
        await $store.dispatch('login', oauthInfoFromLocal)
        if (userRouterName.indexOf(to.name) >= 0) {
            next({name: 'app'})
        } else {
            next()
        }
    } else if ($store.getters.isLogin || userRouterName.indexOf(to.name) >= 0) {
        next()
    } else {
        Notification({
            title: '消息',
            type: 'warning',
            message: '请先登录'
        })
        next({name: 'user'})
    }
})

export default router
