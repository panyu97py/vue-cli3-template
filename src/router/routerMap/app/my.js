/**
 * 我的个人中心
 */
export default {
    name: 'my',
    path: 'my',
    meta: {title: '个人中心', authority: ['ROLE_ADMIN', 'ROLE_MANAGER','ROLE_USER']},
    component: () => import('@/components/routerView'),
    children: [
        {
            name: 'myApply',
            path: 'myApply',
            meta: {title: '我的申请', authority: ['ROLE_ADMIN', 'ROLE_MANAGER','ROLE_USER']},
            component: () => import('@/views/app/my/myApply'),
        },
        {
            name: 'myCollege',
            path: 'myCollege',
            meta: {title: '我的学院', authority: ['ROLE_ADMIN', 'ROLE_MANAGER','ROLE_USER']},
            component: () => import('@/views/app/my/myCollege')
        },
        {
            name: 'myNotify',
            path: 'myNotify',
            meta: {title: '我的通知', authority: ['ROLE_ADMIN', 'ROLE_MANAGER','ROLE_USER']},
            component: () => import('@/views/app/my/myNotify')
        },
        {
            name: 'myShare',
            path: 'myShare',
            meta: {title: '我的共享', authority: ['ROLE_ADMIN', 'ROLE_MANAGER','ROLE_USER']},
            component: () => import('@/views/app/my/myShare')
        }
    ]
}
