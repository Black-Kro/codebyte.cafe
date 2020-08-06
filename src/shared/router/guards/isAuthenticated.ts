import { watch } from 'vue';
import { store } from '/@app/store/';

export const isAuthenticated = (to, from, next) => {

    /**
     * To ensure the user doesn't get caught in an endless loop if this is applied to the entire router,
     * check if the path is `/sign-in` and if it is allow them to access it.
     */
    if (to.path === '/sign-in')
        return next();

    const { getters } = store;
    
    if (getters['auth/status'] === 'AUTHENTICATED') {
        return next();
    }
    
    if (getters['auth/status'] === 'UNAUTHENTICATED') {
        return next({ path: '/sign-in' })
    }
    
    if (getters['auth/status'] === 'PENDING') {
        const stop = watch(() => getters['auth/status'], () => {            
            if (getters['auth/status'] === 'AUTHENTICATED') {
                stop();
                return next();
            }

            if (getters['auth/status'] === 'UNAUTHENTICATED') {
                stop();
                return next({ path: '/sign-in' })
            }
        });
    }
};