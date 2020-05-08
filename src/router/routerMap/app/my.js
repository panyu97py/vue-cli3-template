/**
 * 我的个人中心
 */
export default  {
    name: 'my',
    path: 'my',
    meta: {title: '个人中心'},
    component: () => import('@/components/routerView'),
    children:[
        {
            name:'myApply',
            path:'myApply',
            meta: {title: '我的申请'},
            component: () => import('@/views/app/my/myApply'),
        }
    ]
}
