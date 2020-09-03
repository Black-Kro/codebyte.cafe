import { UserConfig } from 'vite';

import path from 'path';
import ViteComponents from 'vite-plugin-components';

const alias = {
    '/~/': path.resolve(__dirname, 'src'),
}

const config: UserConfig = {
    alias,
    optimizeDeps: {
        include: [
            'fast-json-stable-stringify',
            'zen-observable',
            'graphql-tag',
            'subscriptions-transport-ws.js',
            'graphql/language/visitor',
            'graphql/language/printer',
        ]
    },
    rollupInputOptions: {
        external: [
            'react',
        ]
    },
    plugins: [
        ViteComponents({
            alias,
            extensions: ['vue', 'ts'],
        })
    ]
}

export default config;
