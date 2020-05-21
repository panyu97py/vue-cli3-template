import request from '@/server/utils/request'

/**
 * 用户注册
 * @returns {*}
 */
export default ({username, password, nickName}) => {
    return request({
        url: '/:server/user/register',
        method: 'post',
        data: {
            username,
            password,
            nickName
        }
    })
}
