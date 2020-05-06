import request from '@/server/utils/request'

/**
 * 根据学校id获取学校信息
 * @param schoolId
 * @returns {*}
 */
export default (schoolId) => {
    return request({
        url: `/:server/school/findById/${schoolId}`,
        method: 'get'
    })
}
