/**
 * Import 3rd Party Libraries
 */
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { KroUIPlugin } from '@black-kro/ui';
import { DefaultApolloClient } from '/~/gql/composable';

/**
 * Import Local Modules
 */
import {
    App, 
    homeRoutes, 
    authRoutes, 
    accountRoutes, 
    exploreRoutes,
    profileRoutes } from '/~/modules/';
    
import { messages } from './messages';
import { icons } from '/~/assets/icons';
import { KroRouter } from '/~/shared/router';
import { store } from '/~/shared/store';
import { apolloClient } from '/~/gql';

/**
 * Register Global Services
 */
import '/~/shared/services/firebase';

import '@black-kro/ui/dist/index.css';

import '/~/styles/base.scss';
import '/~/styles/theme.scss';
import 'cropperjs/dist/cropper.min.css';

// import AppPostChild from '/~/components/Posts/Post/AppPost.vue';

/**
 * i18n
 */
const i18n = createI18n({
    locale: 'en',
    messages,
})

createApp(App)
    .use(KroRouter, {
        routes: [
            ...homeRoutes,
            ...authRoutes,
            ...accountRoutes,
            ...exploreRoutes,
            ...profileRoutes,
        ]
    })
    .provide(DefaultApolloClient, apolloClient)
    .use(KroUIPlugin, {
        icons
    })
    // .component('AppPostChild', AppPostChild)
    .use(store)
    .use(i18n)
    .mount('#app');
