import axios from 'axios'
import requestOauth from "@/server/utils/requestOauth";
import convertUri from "@/server/utils/convertUri";

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
        return response.data
    },
    /**
     * 响应出错的拦截
     * @param error
     * @return {Promise<never>}
     */
    error => {
        return Promise.reject(error)
    }
)

export default service
