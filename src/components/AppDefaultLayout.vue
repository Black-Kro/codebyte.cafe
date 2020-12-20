<template>
  <div
    class="[ app-default-layout ] [ container mx-auto md:p-4 h-full ] [ grid grid-cols-9 gap-4 ]"
  >
    <div
      class="[ app-navigatoin-container ] [ lg:z-auto fixed lg:relative bottom-0 left-0 right-0 lg:flex flex-col col-span-2 ]"
    >
      <the-navigation />
      <slot name="left" />
    </div>
    <div class="[ col-span-9 lg:col-span-5 ]">
      <slot />
    </div>
    <div class="[ hidden lg:flex flex-col col-gap-2 col-span-2 ]">
      <div
        class="sticky flex flex-col"
        style="top: calc(var(--kro-toolbar-height, 4rem) + 1rem)"
      >
        <slot name="right" />
        <app-alpha-state-notice />
        <the-footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss">
.app-navigatoin-container {
  z-index: 1;
}
</style>
