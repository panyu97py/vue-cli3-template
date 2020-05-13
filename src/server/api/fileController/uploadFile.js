
import request from '@/server/utils/request'

/**
 * 上传文件
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
