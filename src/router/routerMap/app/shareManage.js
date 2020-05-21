/**
 * 共享管理
 */
export default {
    name: 'shareManage',
    path: 'shareManage',
    meta: {title: '共享管理', authority: [ 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER']},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'shareManageList',
            meta: {title: '共享列表', authority: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER']},
            component: () => import('@/views/app/shareManage/list')
        }
    ]
}
