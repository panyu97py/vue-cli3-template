import request from '@/server/utils/request'

/**
 * 创建学院
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/college/create',
        method: 'post',
        data: formData
    })
}
