/**
 * 用户模块
 * @description 登陆、注册、忘记密码
 */
export default [
    {
        name:'user',
        path:'/user',
        component:()=>import('@/views/user/layout')
    }
]
