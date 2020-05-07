import request from '@/server/utils/request'

/**
 * 更新申请信息
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/apply/update',
        method: 'put',
        data: formData
    })
}
