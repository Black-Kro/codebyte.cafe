import Axios from 'axios';
import { store } from '/~/shared/store/';

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

    instance.interceptors.response.use((response) => {
        return response;   
    }, (e) => {
        if (e.response.status === 401) {
            const { success, error, banReason, banDate } = e.response.data;
    
            if (error === 'User is banned') {
                store.commit('setNetworkError', {
                    hasError: true,
                    type: 'Ban',
                    message: banReason
                });
            }
        }
    });

    return instance;
};
