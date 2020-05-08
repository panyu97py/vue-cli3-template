import request from '@/server/utils/request'
export default (token) => {
    return request({
        url: '/:server/oauth/check_token',
        method: 'post',
        data: `token=${token}`
    })
}
