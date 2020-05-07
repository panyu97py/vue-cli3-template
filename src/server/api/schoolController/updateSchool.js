import request from '@/server/utils/request'

/**
 * 更新学校信息
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/school/update',
        method: 'put',
        data: formData
    })
}
