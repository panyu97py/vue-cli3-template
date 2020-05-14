import request from '@/server/utils/request'

/**
 * 用户修改密码
 * @returns {*}
 */
export default ({newPwd, oldPwd}) => {
    return request({
        url: '/:server/user/updatePwd',
        method: 'post',
        data: {newPwd, oldPwd}
    })
}
