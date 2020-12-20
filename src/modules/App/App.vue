<template>
  <kro-app class="pb-16 lg:pb-0">
    <kro-layout v-if="!getters['hasNetworkError']">
      <template #toolbar>
        <the-toolbar />
      </template>
      <template #default>
        <router-view :key="$route.path" />
        <kro-button
          class="[ return-to-top ] [ rounded-full w-12 h-12 bottom-16 right-4 lg:bottom-4 p-0 fixed border border-divider ]"
          @click="elevate"
        >
          <kro-icon icon="mdi:arrow-up-thick" />
        </kro-button>
      </template>
      <template #footer>
        <the-footer />
      </template>
    </kro-layout>
  </kro-app>
  <the-toast-dispatcher />
  <the-cropper />
  <the-network-error-screen v-if="getters['hasNetworkError']" />
</template>

<script lang="ts" setup>
import { TheToolbar, TheFooter } from './components'

import { useStore } from 'vuex'
import { useTheme } from '@black-kro/ui'
import { useElevator } from '/~/composables/useElevator'

export const { toggleThemeMode } = useTheme()
export const { dispatch, getters } = useStore()

export const { elevate } = useElevator()

// Listen for authentication changes
dispatch('auth/init')

export const user = getters.user

export default {
  name: 'App',
  components: { TheToolbar, TheFooter },
}
</script>

<style lang="scss">
</style>
