import request from '@/server/utils/request'

/**
 * 根据学院id获取学院信息
 * @param collegeId
 * @returns {*}
 */
export default (collegeId) => {
    return request({
        url: `/:server/college/findById/${collegeId}`,
        method: 'get'
    })
}
