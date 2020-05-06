import request from '@/server/utils/request'

/**
 * 创建学校
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/school/create',
        method: 'post',
        data: formData
    })
}
