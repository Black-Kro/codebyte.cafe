import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/~/shared/router/guards';

import Home from './Home.vue';
import People from './People.vue';

export const homeRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        beforeEnter: isAuthenticated,
        component: () => Home,
        meta: {
            title: 'Home',
        }
    },
    {
        path: '/about',
        component: () => import('./About.vue'),
        meta: {
            title: 'About',
        },
    },
    {
        path: '/help',
        component: () => import('./Help.vue'),
        meta: {
            title: 'Help',
        },
    },
    {
        path: '/people',
        beforeEnter: isAuthenticated,
        component: People,
        meta: {
            title: 'People',
        },
    },
    {
        path: '/privacy-policy',
        component: () => import('./PrivacyPolicy.vue'),
        meta: {
            title: 'Privacy Policy',
        }
    },
    {
        path: '/terms-of-service',
        component: () => import('./TermsOfService.vue'),
        meta: {
            title: 'Terms of Service',
        }
    }
]