import my from "./my";
import schoolManage from "./schoolManage";
import collegeManage from "./collegeManage";
import notifyManage from "./notifyManage";
import shareManage from "./shareManage";

/**
 * app 模块
 */
export default [
    {
        name: 'app',
        path: '/app',
        component: () => import('@/views/app/layout'),
        redirect: {name: 'my'},
        children: [
            my,
            schoolManage,
            collegeManage,
            notifyManage,
            shareManage
        ]
    }
]
