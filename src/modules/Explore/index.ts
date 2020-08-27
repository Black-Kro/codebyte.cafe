import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/~/shared/router/guards';

export const exploreRoutes: RouteRecordRaw[] = [
    {
        path: '/explore',
        beforeEnter: isAuthenticated,
        component: () => import('./Explore.vue'),
        meta: {
            title: 'Explore',
        }
    },
]