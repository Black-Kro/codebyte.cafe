import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/~/shared/router/guards';

export const homeRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        beforeEnter: isAuthenticated,
        component: () => import('./Home.vue'),
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
        component: () => import('./People.vue'),
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