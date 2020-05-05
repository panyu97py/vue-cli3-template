/**
 * 共享管理
 */
export default {
    name: 'shareManage',
    path: 'shareManage',
    meta: {title: '共享管理'},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'shareManageList',
            meta: {title: '学校列表'},
            component: () => import('@/views/app/shareManage/list')
        }
    ]
}
