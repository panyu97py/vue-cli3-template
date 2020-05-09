/**
 * 我的个人中心
 */
export default {
    name: 'my',
    path: 'my',
    meta: {title: '个人中心'},
    component: () => import('@/components/routerView'),
    children: [
        {
            name: 'myApply',
            path: 'myApply',
            meta: {title: '我的申请'},
            component: () => import('@/views/app/my/myApply'),
        },
        {
            name: 'myCollege',
            path: 'myCollege',
            meta: {title: '我的学院'},
            component: () => import('@/views/app/my/myCollege')
        },
        {
            name: 'myNotify',
            path: 'myNotify',
            meta: {title: '我的通知'},
            component: () => import('@/views/app/my/myNotify')
        }
    ]
}
