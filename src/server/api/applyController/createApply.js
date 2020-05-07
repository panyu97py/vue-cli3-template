import request from '@/server/utils/request'

/**
 * 创建申请
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/apply/create',
        method: 'post',
        data: formData
    })
}
