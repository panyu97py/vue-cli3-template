import request from '@/server/utils/request'

/**
 * 删除申请
 * @param collegeId
 * @returns {*}
 */
export default (collegeId) => {
    return request({
        url: `/:server/apply/delete/${collegeId}`,
        method: 'delete'
    })

}
