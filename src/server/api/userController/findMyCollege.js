import request from '@/server/utils/request'

/**
 * 获取我的学院信息
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/user/findMyCollege',
        method: 'get'
    })
}
