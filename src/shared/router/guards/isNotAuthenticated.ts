import { watch } from 'vue';
import { store } from '/@app/store/';

const { getters } = store;

export const isNotAuthenticated = async (to, from) => {

    const status = await waitForStatusResolution();

    if (status === 'AUTHENTICATED') {
        return { path: '/' };
    }
    
    if (status === 'UNAUTHENTICATED') {
        return;
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
