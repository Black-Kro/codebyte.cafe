import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/@app/router/guards';

export const accountRoutes: RouteRecordRaw[] = [
    {
        path: '/settings',
        component: () => import('./Settings.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Settings',
        }
    },
]