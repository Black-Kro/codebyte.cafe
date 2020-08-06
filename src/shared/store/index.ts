import { createStore } from 'vuex';

import * as StoreModules from './modules'; 

export const store = createStore({
    modules: {
        ...StoreModules
    },
});
