import request from '@/server/utils/request'

/**
 * 发送通知
 * @returns {*}
 */
export default (notifyDraftId) => {
    return request({
        url: `/:server/notifyDraft/send/${notifyDraftId}`,
        method: 'patch'
    })
}
