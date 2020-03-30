import user from './user'
import app from './app'

/**
 * 路由表
 */
export default [
    {
        path: '/',
        redirect: {name: 'user'},
    },
    ...app,
    ...user
]
