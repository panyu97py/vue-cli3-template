import request from '@/server/utils/request'
export default (token) => {
    return request({
        url: '/:uaa/oauth/check_token',
        method: 'post',
        data: `token=${token}`
    })
}
