/**
 * 学校管理
 */
export default {
    name: 'schoolManage',
    path: 'schoolManage',
    meta: {title: '学校管理', authority: ['ROLE_SYSTEM']},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'schoolManageList',
            meta: {title: '学校列表', authority: ['ROLE_SYSTEM']},
            component: () => import('@/views/app/schoolManage/list')
        }
    ]
}
