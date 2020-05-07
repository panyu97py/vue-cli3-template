import request from '@/server/utils/request'

/**
 * 更新学院信息
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/college/update',
        method: 'put',
        data: formData
    })
}
