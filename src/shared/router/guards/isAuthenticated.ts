import { watch } from 'vue';
import { store } from '/@app/store/';

const { getters } = store;

export const isAuthenticated = async (to, from) => {
    const status = await waitForStatusResolution();

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
            return;
    }

    if (whitelist.indexOf(to.path) > -1)
        return;

    
    if (status === 'AUTHENTICATED') {
        return;
    }
    
    if (status === 'UNAUTHENTICATED') {
        return { path: '/sign-in' };
    }

    if (status === 'INCOMPLETE') {
        return { path: '/create-account' };
    }

};


const waitForStatusResolution = () => {
    return new Promise((resolve, reject) => {
        if (getters['auth/status'] !== 'PENDING') {
            return resolve(getters['auth/status']);
        }

        const stop = watch(() => getters['auth/status'], () => {
            if (getters['auth/status'] === 'AUTHENTICATED') {
                stop();
                return resolve(getters['auth/status']);
            }
            
            if (getters['auth/status'] === 'INCOMPLETE') {
                stop();
                return resolve(getters['auth/status']);
            }
            
            if (getters['auth/status'] === 'UNAUTHENTICATED') {
                stop();
                return resolve(getters['auth/status']);
            }
        });
    });
};
