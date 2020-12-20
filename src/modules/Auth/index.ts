import { RouteRecordRaw } from 'vue-router'
import { isNotAuthenticated, isAuthenticated } from '/~/shared/router/guards'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    component: () => import('./SignIn.vue'),
    beforeEnter: isNotAuthenticated,
    meta: {
      title: 'Sign In',
    },
  },
  {
    path: '/sign-up',
    beforeEnter: isNotAuthenticated,
    component: () => import('./SignUp.vue'),
    meta: {
      title: 'Sign Up',
    },
  },
  {
    path: '/create-account',
    component: () => import('./CreateAccount.vue'),
    beforeEnter: isAuthenticated,
    meta: {
      title: 'Create Account',
    },
  },
]
