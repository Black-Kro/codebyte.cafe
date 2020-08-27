import { UserConfig } from 'vite';

import path from 'path';
import ViteComponents from 'vite-plugin-components';

const alias = {
    '/~/': path.resolve(__dirname, 'src'),
}

const config: UserConfig = {
    alias,
    plugins: [
        ViteComponents({
            alias,
            extensions: ['vue', 'ts'],
        })
    ]
}

export default config;


// import { UserConfig } from 'vite';
// import ViteComponents from 'vite-plugin-components';
// const path = require('path');

// const alias = {
//     '/~/': path.resolve(__dirname, 'src'),
//     '/@app/composables/': path.resolve(__dirname, './src/shared/composables'),
//     '/@app/components/': path.resolve(__dirname, './src/shared/components'),
//     '/@app/services/': path.resolve(__dirname, './src/shared/services'),
//     '/@app/styles/': path.resolve(__dirname, './src/shared/styles'),
//     '/@app/store/': path.resolve(__dirname, './src/shared/store'),
//     '/@app/router/': path.resolve(__dirname, './src/shared/router'),
//     '/@app/gql/': path.resolve(__dirname, './src/shared/gql'),
//     '/@app/': path.resolve(__dirname, './src'),
// }

// module.exports = {
//     alias,
//     plugins: [
//         ViteComponents({
//             alias
//         })
//     ]
// } as UserConfig