import { Plugin } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useTitle } from '/~/composables/';
import { scrollWaiter } from './scrollWaiter';

import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export const KroRouter: Plugin = {
    install(app, { routes }) {

        const { setTitle } = useTitle();

        const router = createRouter({
            history: createWebHistory(),
            routes,
            async scrollBehavior(to, from, savedPosition) {
                await scrollWaiter.wait();

                if (savedPosition) {
                    return savedPosition;
                } else {
                    if (to.matched.every((record, i) => from.matched[i] !== record))
                        return { left: 0, top: 0 }
                }

                return false
            }
        });

        router.beforeEach((to, from, next) => {
            NProgress.start();
            next();
        });

        router.afterEach((to, from) => {

            if (to.meta.title) {
                setTitle(to.meta.title);
            }

            NProgress.done();
        });

        app.use(router);
    }
};
