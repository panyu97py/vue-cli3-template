import $router from '@/router'
import $api from '@/server/api'

export default {
    state: {
        userInfo: null,
        oauthInfo: {}
    },
    getters: {
        userInfo: state => state.userInfo,
        token: state => state.oauthInfo?.access_token
    },
    mutations: {
        SET_OAUTH_INFO(state, oauthInfo) {
            state.oauthInfo = oauthInfo
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo

        }
    },
    actions: {
        /**
         * 登录
         * @param commit
         * @param dispatch
         * @param username
         * @param password
         * @returns {Promise<*>}
         */
        async login({commit, dispatch}, {username, password} = {}) {
            const res = await $api.oauthToken({username, password})
            commit('SET_OAUTH_INFO', res)
            await dispatch('getMyUserInfo')
            return res
        },
        /**
         * 获取用户信息
         * @param commit
         * @returns {Promise<void>}
         */
        async getMyUserInfo({commit}) {
            const res = await $api.getMyUserInfo()
            commit('SET_USER_INFO', res)
        },
        /**
         * 退出
         * @param commit
         */
        loginOut({commit}) {
            commit('SET_OAUTH_INFO', {})
            commit('SET_USER_INFO', {})
            $router.push({name: 'user'})
        }
    }
}
