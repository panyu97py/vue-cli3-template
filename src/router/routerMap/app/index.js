/**
 * app 模块
 */
export default [
    {
        name: 'app',
        path: '/app',
        component: () => import('@/views/app/layout'),
        children: [
            {
                name: 'testView',
                path: 'testView',
                meta: {title: '测试页面', authority: true},
                component: () => import('@/views/app/testView')
            }
        ]
    }
]
