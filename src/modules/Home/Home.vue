<template>
  <app-default-layout>
    <kro-surface :padded="false">
      <app-post-box />
      <kro-divider class="m-0" />
      <app-post-feed subscribe-to-more />
    </kro-surface>
  </app-default-layout>
</template>

<script lang="ts" setup>
export default {
  name: 'Home',
}
</script>

<style lang="scss">
.app-sidebar-avatar {
  border: 0.5rem solid var(--kro-background-secondary);
}
</style>
