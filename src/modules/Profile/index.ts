import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/~/shared/router/guards';

export const profileRoutes: RouteRecordRaw[] = [
    {
        path: '/@:username',
        component: () => import('./Profile.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Profile',
        }
    },
    {
        path: '/@:username/:post',
        component: () => import('./ProfilePost.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Post'
        }
    }
];
