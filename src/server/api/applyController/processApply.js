import request from '@/server/utils/request'

/**
 * 处理申请
 * @param applyId
 * @param auditStatus
 * @returns {*}
 */
export default ({applyId, auditStatus}) => {
    return request({
        url: `/:server/apply/process/${applyId}/${auditStatus}`,
        method: 'path',
    })
}
