import { watch } from 'vue';
import { store } from '/@app/store/';

export const isNotAuthenticated = (to, from, next) => {
    const { getters } = store;
    
    if (getters['auth/status'] === 'AUTHENTICATED') {
        return next({ path: '/' });
    }
    
    if (getters['auth/status'] === 'UNAUTHENTICATED') {
        return next()
    }
    
    if (getters['auth/status'] === 'PENDING') {
        const stop = watch(() => getters['auth/status'], () => {            
            if (getters['auth/status'] === 'AUTHENTICATED') {
                stop();
                return next({ path: '/' });
            }

            if (getters['auth/status'] === 'UNAUTHENTICATED') {
                stop();
                return next();
            }
        });
    }
};