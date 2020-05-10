/**
 * 通知管理
 */
export default {
    name: 'notifyManage',
    path: 'notifyManage',
    meta: {title: '通知管理', authority: ['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER']},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'notifyManageList',
            meta: {title: '通知管理', authority: ['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER']},
            component: () => import('@/views/app/notifyManage/list')
        }
    ]
}
