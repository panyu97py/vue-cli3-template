import request from '@/server/utils/request'

/**
 * 更新共享
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/share/update',
        method: 'put',
        data: formData
    })
}
