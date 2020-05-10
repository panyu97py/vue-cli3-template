import $router from '@/router'
import $api from '@/server/api'

export default {
    state: {
        userInfo: null,
        oauthInfo: {},
        isLogin: false
    },
    getters: {
        userInfo: state => state.userInfo,
        token: state => state.oauthInfo?.access_token,
        isLogin: state => state.isLogin,
        roles: state => state.userInfo?.roles
    },
    mutations: {
        SET_OAUTH_INFO(state, oauthInfo) {
            state.oauthInfo = oauthInfo
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_LOGIN_STATUS(state, status) {
            state.isLogin = status
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
        async login({commit, dispatch}, {username, password, access_token} = {}) {
            if (access_token) {
                await new Promise((resolve, reject) => {
                    $api.checkToken(access_token).then(() => {
                        resolve()
                    }).catch(() => {
                        dispatch('loginOut')
                        reject()
                    })
                })
                commit('SET_OAUTH_INFO', {access_token})
            } else {
                const res = await $api.oauthToken({username, password})
                commit('SET_OAUTH_INFO', res)
                localStorage.setItem('oauthInfo', JSON.stringify(res))
            }
            await dispatch('getMyUserInfo')
            commit('SET_LOGIN_STATUS', true)
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
            commit('SET_LOGIN_STATUS', false)
            localStorage.removeItem('oauthInfo')
            $router.push({name: 'user'})
        }
    }
}
