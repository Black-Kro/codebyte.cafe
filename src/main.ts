/**
 * Import 3rd Party Libraries
 */
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { KroUIPlugin } from '@black-kro/ui'
import { DefaultApolloClient } from '@black-kro/use-apollo'

import '@iconify/iconify'
import Iconfiy from '@purge-icons/generated'

/**
 * Import Local Modules
 */
import {
  App,
  homeRoutes,
  authRoutes,
  accountRoutes,
  exploreRoutes,
  profileRoutes,
  adminRoutes,
} from '/~/modules/'

import { messages } from './messages'
import { KroRouter } from '/~/shared/router'
import { store } from '/~/shared/store'
import { client } from '/~/apollo'

/**
 * Register Global Services
 */
import '/~/shared/services/firebase'

import '@black-kro/ui/dist/index.css'

import '/~/styles/base.scss'
import '/~/styles/theme.scss'
import 'cropperjs/dist/cropper.min.css'

import AppPostChildFeed from '/~/components/Posts/PostFeed/AppPostFeed.vue'

/**
 * i18n
 */
const i18n = createI18n({
  locale: 'en',
  legacy: true,
  messages,
})

createApp(App)
  .use(KroRouter, {
    routes: [
      ...homeRoutes,
      ...authRoutes,
      ...accountRoutes,
      ...exploreRoutes,
      ...profileRoutes,
      ...adminRoutes,
    ],
  })
  .provide(DefaultApolloClient, client)
  .use(KroUIPlugin, {
    icons: Iconfiy,
  })
  .component('AppPostChildFeed', AppPostChildFeed)
  .use(store)
  .use(i18n)
  .mount('#app')
