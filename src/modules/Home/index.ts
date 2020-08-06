import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/@app/router/guards';

export const homeRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('./Home.vue'),
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Home',
        }
    },
    {
        path: '/About',
        component: () => import('./About.vue'),
        meta: {
            title: 'About',
        },
    },
]