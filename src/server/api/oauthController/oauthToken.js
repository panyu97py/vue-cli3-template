import request from '@/server/utils/request'
/**
 * 登陆
 * @param username 用户名
 * @param password 密码
 * @param grant_type 类型：refresh_token/password
 */
const OAUTH_HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic c2FzLXdlYjpzYXMtd2Vi'
}
export default ({username, password} = {}) => {
    let data = {
        username,
        password,
        grant_type: 'password'
    }
    data = Object.keys(data).map(key => {
        return `${key}=${data[key]}`
    })
    return request({
        url: '/:server/oauth/token',
        method: 'post',
        headers: OAUTH_HEADER,
        data: data.join('&')
    })
}
