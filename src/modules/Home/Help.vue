<template>
  <app-default-layout>
    <kro-surface>
      <div class="markdown-body">
        <help-markdown />
      </div>
    </kro-surface>
  </app-default-layout>
</template>

<script lang="ts" setup>
import { VueComponent } from './Help.md'

export default {
  name: 'HelpView',
  components: {
    HelpMarkdown: VueComponent,
  },
}
</script>

<style lang="scss">
</style>
