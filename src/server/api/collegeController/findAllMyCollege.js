import request from '@/server/utils/request'

/**
 * 获取全部我管理的学院
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/college/findMyAll',
        method: 'get'
    })
}
