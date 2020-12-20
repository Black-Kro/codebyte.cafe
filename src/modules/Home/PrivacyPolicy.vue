<template>
  <app-default-layout>
    <kro-surface class="container markdown max-w-2xl mx-auto">
      <div class="px-4 pt-2">
        <privacy-policy />
      </div>
    </kro-surface>
  </app-default-layout>
</template>

<script lang="ts" setup>
import PrivacyPolicy from './PrivacyPolicy.md'
export default {
  name: 'PrivacyPolicyView',
  components: {
    PrivacyPolicy,
  },
}
</script>

<style lang="scss">
</style>
