import request from '@/server/utils/request'

/**
 * 根据id查找共享
 * @param type
 * @returns {*}
 */
export default (shareId) => {
    return request({
        url: `/:server/share/findById/${shareId}`,
        method: 'get'
    })
}
