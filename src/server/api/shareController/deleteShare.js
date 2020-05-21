import request from '@/server/utils/request'

/**
 * 删除共享
 * @param formData
 * @returns {*}
 */
export default (shareId) => {
    return request({
        url: `/:server/share/delete/${shareId}`,
        method: 'delete'
    })
}
