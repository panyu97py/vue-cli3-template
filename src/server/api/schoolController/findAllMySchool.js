import request from '@/server/utils/request'

/**
 * 获取全部我管理的学校
 * @returns {*}
 */
export default (schoolId) => {
    return request({
        url: '/:server/school/findAllMy',
        method: 'get'
    })
}
