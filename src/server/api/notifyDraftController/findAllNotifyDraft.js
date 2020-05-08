import request from '@/server/utils/request'

/**
 * 获取全部通知草稿
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/notifyDraft/findAll',
        method: 'get'
    })
}
