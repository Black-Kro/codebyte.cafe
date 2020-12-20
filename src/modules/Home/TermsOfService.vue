<template>
  <app-default-layout>
    <kro-surface class="container markdown max-w-2xl mx-auto">
      <div class="px-4">
        <terms-of-service />
      </div>
    </kro-surface>
  </app-default-layout>
</template>

<script lang="ts" setup>
import TermsOfService from './TermsOfService.md'
export default {
  name: 'TermsOfServiceView',
  components: {
    TermsOfService,
  },
}
</script>

<style lang="scss">
</style>
