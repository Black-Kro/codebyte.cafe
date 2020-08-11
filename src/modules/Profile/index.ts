import { RouteRecordRaw } from 'vue-router';
import { isNotAuthenticated } from '/@app/router/guards';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('./Profile.vue'),
        beforeEnter: isNotAuthenticated,
        meta: {
            title: 'Profile',
        },
    },
];
