import request from '@/server/utils/request'

/**
 * 删除学院
 * @param collegeId
 * @returns {*}
 */
export default (collegeId) => {
    return request({
        url: `/:server/college/delete/${collegeId}`,
        method: 'delete'
    })

}
