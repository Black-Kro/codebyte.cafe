<template>
  <div>
    <user-identity skeleton />
    <div class="ml-12">
      <div class="px-4 ml-2 grid gap-3">
        <span class="bg-background h-3 block rounded-md w-full" />
        <span class="bg-background h-3 block rounded-md w-4/5" />
        <span class="bg-background h-3 block rounded-md w-5/6" />
        <span class="bg-background h-3 block rounded-md w-1/2" />
      </div>
      <div class="px-4 pt-4 ml-2 grid fit gap-2 app-post-skeleton-footer pb-4">
        <kro-squircle class="w-8 h-8 text-background" />
        <kro-squircle class="w-8 h-8 text-background" />
        <kro-squircle class="w-8 h-8 text-background" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export default {
  name: '',
}
</script>

<style lang="scss">
.app-post-skeleton-footer {
  grid-template-columns: repeat(auto-fit, minmax(0, min-content));
}
</style>
