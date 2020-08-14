import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/@app/router/guards';

export const profileRoutes: RouteRecordRaw[] = [
    {
        path: '/@:username',
        component: () => import('./Profile.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Profile',
        }
    },
];
