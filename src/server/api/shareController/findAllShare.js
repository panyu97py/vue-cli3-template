import request from '@/server/utils/request'

/**
 * 查找共享
 * @param type
 * @returns {*}
 */
export default (type) => {
    return request({
        url: '/:server/share/findAll',
        method: 'get',
        params: {
            type: type || null
        }
    })
}
