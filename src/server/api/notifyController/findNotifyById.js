import request from '@/server/utils/request'

/**
 * 根据id获取通知
 * @returns {*}
 */
export default (notifyId) => {
    return request({
        url: `/:server/notify/${notifyId}`,
        method: 'get'
    })
}
