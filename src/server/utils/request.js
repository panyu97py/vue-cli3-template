import axios from 'axios'
import requestOauth from "@/server/utils/requestOauth";
import convertUri from "@/server/utils/convertUri";
import {Notification} from "element-ui";
import $store from '@/store'

/**
 * 创建 axios 实例
 * @type {AxiosInstance}
 */
const service = axios.create({
    timeout: 60000 // 请求超时时间
})

/**
 * request 拦截器
 */
service.interceptors.request.use(
    config => {
        const Authorization = requestOauth(config)
        if (Authorization) {
            config.headers['Authorization'] = Authorization
        }
        config.url = convertUri(config.url)
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

/**
 * response 拦截器
 */
service.interceptors.response.use(
    /**
     * 成功响应的拦截
     * @param response
     * @return {any}
     */
    response => {
        return response.data?.data || response.data
    },
    /**
     * 响应出错的拦截
     * @param error
     * @return {Promise<never>}
     */
    error => {
        console.log(error.response)
        if (error.response?.status === 401) {
            Notification({
                type: 'error',
                title: '错误',
                message: /api\/oauth\/token/.test(error.response?.config?.url) ? '用户名或密码错误' : '您的登陆已过期'
            })
            if (!/api\/oauth\/token/.test(error.response?.config?.url)) {
                $store.dispatch('loginOut')
            }
        } else if (error.response?.status === 403) {
            Notification({
                type: 'error',
                title: '错误',
                message: '权限不足'
            })
        } else {
            Notification({
                type: 'error',
                title: '错误',
                message: (error.response.data && (error.response.data.description || error.response.data.message)) || '未知错误'
            })
        }
        return Promise.reject(error)
    }
)

export default service
