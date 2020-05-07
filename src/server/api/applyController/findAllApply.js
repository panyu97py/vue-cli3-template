import request from '@/server/utils/request'

/**
 * 获取全部申请
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/apply/findAll',
        method: 'get'
    })
}
