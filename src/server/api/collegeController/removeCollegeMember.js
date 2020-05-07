import request from '@/server/utils/request'

/**
 * 移除学院成员
 * @param collegeId
 * @param userId
 * @returns {*}
 */
export default ({collegeId,userId}) => {
    return request({
        url: `/:server/college/removeMember/${collegeId}/${userId}`,
        method: 'patch'
    })
}
