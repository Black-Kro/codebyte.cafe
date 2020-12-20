<template>
  <div class="fixed inset-0 bg-primary w-full h-full z-50 grid items-center">
    <!-- Ban Screen -->
    <div class="flex flex-col items-center">
      <kro-icon class="network-screen-icon" icon="mdi:hammer" />
      <span class="text-sm font-medium mt-4">Oof, you have been banned</span>
      <div class="max-w-md w-full bg-secondary px-4 py-2 mt-4 rounded-sm">
        <div class="font-bold text-sm text-foregroundSecondary w-full">
          Reason
        </div>
        <span class="text-sm font-medium block">
          {{ getters["networkErrorMessage"] }}
        </span>
        <img
          class="rounded-sm mt-2 mb-2"
          src="https://media1.tenor.com/images/cc3124ae4feda606732d8e128e38dd2f/tenor.gif?itemid=16215287"
          alt=""
        >
      </div>
      <div class="mt-4">
        <kro-button
          class="mr-2"
          @click="dispatch('auth/signOut')"
        >
          Sign Out
        </kro-button>
        <kro-button @click="reload">
          Reload
        </kro-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

export const { getters, dispatch } = useStore()

export const reload = () => {
  window.location.reload()
}

export default {
  name: 'TheNetworkErrorScreen',
}
</script>

<style lang="scss">
.network-screen-icon {
  --kro-icon-size: 5rem;
}
</style>
