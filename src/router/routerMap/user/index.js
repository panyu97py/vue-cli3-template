/**
 * 用户模块
 * @description 登陆、注册、忘记密码
 */
export default [
    {
        name:'user',
        path:'/user',
        component:()=>import('@/views/user/layout'),
        redirect: {name: 'login'},
        children:[
            {
                path:'login',
                name:'login',
                component:()=>import('@/views/user/login')
            },
            {
                path:'register',
                name:'register',
                component:()=>import('@/views/user/register')
            }

        ]
    }
]
