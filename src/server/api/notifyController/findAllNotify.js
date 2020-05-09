import request from '@/server/utils/request'

/**
 * 获取全部通知
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/notify/findAll',
        method: 'get'
    })
}
