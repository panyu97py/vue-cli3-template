
import request from '@/server/utils/request'

/**
 * 下载文件
 * @param formData
 * @returns {*}
 */
export default (fileName) => {
    return request({
        url: `/:server/file/downLoad/${fileName}`,
        method: 'get',
        responseType: 'arraybuffer'
    })
}
