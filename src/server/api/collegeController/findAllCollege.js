import request from '@/server/utils/request'

/**
 * 获取全部学院
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/college/findAll',
        method: 'get'
    })
}
