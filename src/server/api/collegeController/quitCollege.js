import request from '@/server/utils/request'

/**
 * 退出学院
 * @param collegeId
 * @returns {*}
 */
export default (collegeId) => {
    return request({
        url: `/:server/college/quit/${collegeId}`,
        method: 'path'
    })
}
