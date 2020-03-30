import Vue from 'vue'
import Router from 'vue-router'
import routerMap from './routerMap'
Vue.use(Router)

/**
 * 初始化路由
 * @type {VueRouter}
 */
const router = new Router({
    routes: routerMap
})

/**
 * 路由守卫
 */
router.beforeEach(async (to, from, next) => {
    next()
})

export default router
