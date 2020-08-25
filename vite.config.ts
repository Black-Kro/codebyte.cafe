import { UserConfig } from 'vite';
const path = require('path');

module.exports = {
    alias: {
        '/@app/composables/': path.resolve(__dirname, './src/shared/composables'),
        '/@app/components/': path.resolve(__dirname, './src/shared/components'),
        '/@app/services/': path.resolve(__dirname, './src/shared/services'),
        '/@app/styles/': path.resolve(__dirname, './src/shared/styles'),
        '/@app/store/': path.resolve(__dirname, './src/shared/store'),
        '/@app/router/': path.resolve(__dirname, './src/shared/router'),
        '/@app/gql/': path.resolve(__dirname, './src/shared/gql'),
        '/@app/': path.resolve(__dirname, './src'),
    }
} as UserConfig