import request from '@/server/utils/request'

/**
 * 根据申请id获取申请
 * @param collegeId
 * @returns {*}
 */
export default (collegeId) => {
    return request({
        url: `/:server/apply/findById/${collegeId}`,
        method: 'get'
    })
}
