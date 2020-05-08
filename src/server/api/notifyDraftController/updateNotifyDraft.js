import request from '@/server/utils/request'

/**
 * 更新通知草稿
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/notifyDraft/update',
        method: 'put',
        data: formData
    })
}
