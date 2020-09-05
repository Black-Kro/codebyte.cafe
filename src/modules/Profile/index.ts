import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from '/~/shared/router/guards';

import Profile from './Profile.vue';
import ProfilePost from './ProfilePost.vue';

export const profileRoutes: RouteRecordRaw[] = [
    {
        path: '/@:username',
        component: Profile,
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Profile',
        },
        children: [
            {
                path: '/@:username',
                component: () => import('./ProfilePosts.vue')
            },
            {
                path: '/@:username/followers',
                component: () => import('./ProfileFollowers.vue')
            },
            {
                path: '/@:username/following',
                component: () => import('./ProfileFollowing.vue')
            }
        ]
    },
    {
        path: '/@:username/:post',
        component: ProfilePost,
        beforeEnter: isAuthenticated,
        meta: {
            title: 'Post'
        }
    }
];
