import request from '@/server/utils/request'

/**
 * 删除通知草稿
 * @param notifyDraftId
 * @returns {*}
 */
export default (notifyDraftId) => {
    return request({
        url: `/:server/notifyDraft/delete/${notifyDraftId}`,
        method: 'delete'
    })

}
