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
