import request from '@/server/utils/request'

/**
 * 文件上传
 * @param formData
 * @returns {*}
 */
export default (formData) => {
    return request({
        url: '/:server/file/cos',
        method: 'post',
        data: formData
    })
}
