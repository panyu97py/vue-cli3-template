/**
 * 学院管理
 */
export default {
    name: 'collegeManage',
    path: 'collegeManage',
    meta: {title: '学院管理'},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'collegeManageList',
            meta: {title: '学院列表'},
            component: () => import('@/views/app/collegeManage/list')
        },
        {
            path: 'applicationReview',
            name: 'collegeApplicationReview',
            meta: {title: '申请审核'},
            component: () => import('@/views/app/collegeManage/applicationReview')
        }
    ]
}
