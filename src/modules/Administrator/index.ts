import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated, isAdministrator } from '/~/shared/router/guards';

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/administrator',
        beforeEnter: [isAuthenticated, isAdministrator],
        component: () => import('./AdminDashboard.vue'),
        meta: {
            title: 'Admin Dashboard',
        }
    },
    {
        path: '/administrator/invites',
        beforeEnter: [isAuthenticated, isAdministrator],
        component: () => import('./ManageInvites.vue'),
        meta: {
            title: 'Manage Invites',
        }
    },
    {
        path: '/administrator/reports',
        beforeEnter: [isAuthenticated, isAdministrator],
        component: () => import('./ManageReports.vue'),
        meta: {
            title: 'Manage Reports',
        }
    },
    {
        path: '/administrator/reports/:id',
        beforeEnter: [isAuthenticated, isAdministrator],
        component: () => import('./ViewReport.vue'),
        meta: {
            title: 'View Report',
        }
    },
]