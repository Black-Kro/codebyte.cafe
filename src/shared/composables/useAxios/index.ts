import Axios from 'axios';
import { store } from '/@app/store/';

export const useAxios = (authenticate: boolean = true) => {
    
    const instance = Axios.create();

    instance.interceptors.request.use(async config => {
        if (authenticate) {
            if (store.getters['auth/user']) {
                const token = await store.getters['auth/user'].getIdToken();

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    console.error('[Axios Auth] Failed to retrive token.');
                }
            } else {
                console.error('[Axios Auth] Failed to retrive user from store.');
            }
        }

        return config;
    });

    return instance;
};
