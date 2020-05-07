import request from '@/server/utils/request'

/**
 * 获取我的用户信息
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/user/userInfo',
        method: 'get'
    })
}
