import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/@app/router/guards';

export const accountRoutes: RouteRecordRaw[] = [
    {
        path: '/settings',
        component: () => import('./Settings/Settings.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Settings',
        }
    },
    {
        path: '/create-account',
        component: () => import('./CreateAccount.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Create Account',
        }
    },
    {
        path: '/notifications',
        component: () => import('./Notifications.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Notifications',
        }
    },
]