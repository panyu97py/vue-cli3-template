import request from '@/server/utils/request'

/**
 * 获取全部用户
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/user/findAll',
        method: 'get'
    })
}
