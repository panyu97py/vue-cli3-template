import request from '@/server/utils/request'

/**
 * 创建通知草稿
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/notifyDraft/create',
        method: 'post',
        data: formData
    })
}
