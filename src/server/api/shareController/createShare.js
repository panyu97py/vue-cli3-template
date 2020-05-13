import request from '@/server/utils/request'

/**
 * 创建共享
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/share/create',
        method: 'post',
        data: formData
    })
}
