import { RouteRecordRaw } from 'vue-router'
import { isAuthenticated } from '/~/shared/router/guards'

export const accountRoutes: RouteRecordRaw[] = [
  {
    path: '/settings',
    component: () => import('./Settings/Settings.vue'),
    beforeEnter: isAuthenticated,
    meta: {
      title: 'Settings',
    },
  },
  {
    path: '/notifications',
    component: () => import('./Notifications.vue'),
    beforeEnter: isAuthenticated,
    meta: {
      title: 'Notifications',
    },
  },
]
