import { watch } from 'vue';
import { store } from '/@app/store/';

export const isAuthenticated = (to, from, next) => {

    const { getters } = store;

    const whitelist = [
        ['/sign-in', 'UNAUTHENTICATED'],
        ['/create-account', 'INCOMPLETE']
    ];

    /**
     * To ensure the user doesn't get caught in an endless loop if this is applied to the entire router,
     * check if the path is `/sign-in` and if it is allow them to access it.
     */
    for (const item of whitelist) {
        if (item[0] === to.path && item[1] === getters['auth/status'])
            return next();
    }

    if (whitelist.indexOf(to.path) > -1)
        return next();

    
    if (getters['auth/status'] === 'AUTHENTICATED') {
        return next();
    }
    
    if (getters['auth/status'] === 'UNAUTHENTICATED') {
        return next({ path: '/sign-in' })
    }

    if (getters['auth/status'] === 'INCOMPLETE') {
        return next({ path: '/create-account' });
    }

    if (getters['auth/status'] === 'PENDING') {
        const stop = watch(() => getters['auth/status'], () => {            
            if (getters['auth/status'] === 'AUTHENTICATED') {
                stop();
                return next();
            }

            if (getters['auth/status'] === 'INCOMPLETE') {
                stop();
                return next({ path: '/create-account' });
            }

            if (getters['auth/status'] === 'UNAUTHENTICATED') {
                stop();
                return next({ path: '/sign-in' })
            }
        });
    }
};