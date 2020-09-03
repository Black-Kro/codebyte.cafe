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
        }
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
