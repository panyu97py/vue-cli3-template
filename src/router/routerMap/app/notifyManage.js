/**
 * 通知管理
 */
export default {
    name: 'notifyManage',
    path: 'notifyManage',
    meta: {title: '通知管理'},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'notifyManageList',
            meta: {title: '通知列表'},
            component: () => import('@/views/app/notifyManage/list')
        }
    ]
}
