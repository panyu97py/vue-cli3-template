import request from '@/server/utils/request'

/**
 * 根据通知草稿id获取通知草稿
 * @param schoolId
 * @returns {*}
 */
export default (notifyDraftId) => {
    return request({
        url: `/:server/notifyDraft/findById/${notifyDraftId}`,
        method: 'get'
    })
}
