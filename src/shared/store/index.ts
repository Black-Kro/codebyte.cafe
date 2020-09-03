import { createStore } from 'vuex';

import * as StoreModules from './modules'; 

export const store = createStore({

    state: {
        networkError: false,
        networkErrorType: null,
        networkErrorMessage: null,
    },

    getters: {
        hasNetworkError(state) {
            return state.networkError;
        },
        networkErrorMessage(state) {
            return state.networkErrorMessage;
        },
        networkErrorType(state) {
            return state.networkErrorType;
        }
    },

    mutations: {
        setNetworkError(state, { hasError, type, message }) {
            state.networkError = hasError;
            state.networkErrorType = type;
            state.networkErrorMessage = message;
        }
    },

    modules: {
        ...StoreModules
    },
});
