import request from '@/server/utils/request'

/**
 * 获取全部通知
 * @returns {*}
 */
export default (notifyId) => {
    return request({
        url: `/:server/notify/delete/${notifyId}`,
        method: 'delete'
    })
}
