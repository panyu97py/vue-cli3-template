/**
 * 学院管理
 */
export default {
    name: 'collegeManage',
    path: 'collegeManage',
    meta: {title: '学院管理', authority: ['ROLE_ADMIN', 'ROLE_MANAGER']},
    component: () => import('@/components/routerView'),
    children: [
        {
            path: 'list',
            name: 'collegeManageList',
            meta: {title: '学院列表', authority: ['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER']},
            component: () => import('@/views/app/collegeManage/list')
        },
        {
            path: 'applicationReview',
            name: 'collegeApplicationReview',
            meta: {title: '申请审核', authority: ['ROLE_SYSTEM','ROLE_MANAGER']},
            component: () => import('@/views/app/collegeManage/applicationReview')
        },
        {
            path: 'memberManage',
            name: 'collegeMemberManage',
            meta: {title: '成员管理', authority: ['ROLE_SYSTEM', 'ROLE_ADMIN', 'ROLE_MANAGER']},
            hidden: true,
            component: () => import('@/views/app/collegeManage/memberManage'),
            props: route => route.query
        }
    ]
}
