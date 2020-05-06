import request from '@/server/utils/request'

/**
 * 获取全部学校
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/school/findAll',
        method: 'get'
    })
}
