import request from '@/server/utils/request'

/**
 * 查找我创建的共享
 * @param type
 * @returns {*}
 */
export default () => {
    return request({
        url: '/:server/share/myCreated',
        method: 'get'
    })
}
