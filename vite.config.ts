import path from 'path'
import { UserConfig } from 'vite'
import ViteComponents from 'vite-plugin-components'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteMarkdown, { Mode } from '@black-kro/vite-plugin-markdown'

// const mdPlugin = require('vite-plugin-markdown')

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
      '@apollo/src/errors/index.ts',
      'graphql/language/visitor',
      'graphql/language/printer',
    ],
  },
  rollupInputOptions: {
    external: [
      'react',
    ],
  },
  plugins: [
    ViteComponents({
      alias,
      extensions: ['vue', 'ts'],
    }),
    ViteMarkdown({
      mode: [Mode.VUE],
    }),
    PurgeIcons({

    }),
  ],
}

export default config
