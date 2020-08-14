import Axios from 'axios';
import { store } from '/@app/store/';

const {
    VITE_API_URL
// @ts-ignore
} = import.meta.env;

export const useAxios = (authenticate: boolean = true, useAPI: boolean = true) => {
    
    const instance = Axios.create();

    instance.interceptors.request.use(async config => {
        if (useAPI) {
            config.baseURL = VITE_API_URL;
        }

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
