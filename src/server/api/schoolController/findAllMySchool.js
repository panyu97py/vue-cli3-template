import request from '@/server/utils/request'

/**
 * 获取全部我管理的学校
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/school/findMyAll',
        method: 'get'
    })
}
