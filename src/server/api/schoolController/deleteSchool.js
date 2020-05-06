import request from '@/server/utils/request'

/**
 * 删除学校
 * @param schoolId
 * @returns {*}
 */
export default (schoolId) => {
    return request({
        url: `/:server/school/delete/${schoolId}`,
        method: 'delete'
    })

}
