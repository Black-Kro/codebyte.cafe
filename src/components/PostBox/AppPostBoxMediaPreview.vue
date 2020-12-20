<template>
  <div class="[] [ h-24 ] [ rounded-md overflow-hidden ]">
    <img class="block h-full w-full object-cover" :src="url">
  </div>
</template>

<script lang="ts" setup="props">
import { computed } from 'vue'

export const url = computed(() => {
  return URL.createObjectURL(props.file)
})

export default {
  name: 'PostMediaPreview',
}

declare const props: {
  file: File
}
</script>

<style lang="scss">
</style>
