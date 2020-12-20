<template>
  <div class="flex flex-row px-4 pb-4 items-center">
    <div class="relative">
      <kro-button :disabled="giphy" icon="mdi:picture" />
      <input
        :disabled="giphy"
        multiple
        accept="image/*"
        class="absolute top-0 left-0 w-full h-full opacity-0"
        type="file"
        @change="onFilesSelected"
      >
    </div>
    <!-- <app-post-box-poll class="ml-2" /> -->
    <app-post-box-giphy
      :disabled="media.length > 0"
      @select="(gif) => $emit('update:giphy', gif)"
    />
    <span class="flex-1" />
    <app-progress-ring
      v-if="content.length > 0"
      :progress="(Math.min(500, content.length) / 500) * 100"
      :radius="18"
      :stroke="4"
      :color="content.length < 500 ? 'white' : 'var(--kro-error)'"
      class="mr-2"
    />
    <kro-button :disabled="!canPost" primary @click="$emit('submit')">
      {{ $t("post-box.Post") }}
    </kro-button>
  </div>
</template>

<script lang="ts" setup="props, { emit, attrs }">
import { onMounted, onUnmounted, computed } from 'vue'

declare const props: {
  content: string
  media: any
  giphy
}

declare const emit: any
declare const attrs: any

const onPaste = (e) => {
  Array.from(
    (e.clipboardData || e.originalEvent.clipboardData).items,
  )
    .filter((item: any) => item.kind === 'file')
    .forEach((item: any) => {
      // console.log(item);
      const blob = item.getAsFile()

      emit('update:files', [...attrs.files, blob])
    })
}

onMounted(() => {
  document.addEventListener('paste', onPaste)
})
onUnmounted(() => {
  document.removeEventListener('paste', onPaste)
})

export const canPost = computed(() => {
  return (
    (props.content.length > 0 && props.content.length < 500)
    || props.media.length > 0
    || props.giphy
  )
})

export const onFilesSelected = (e) => {
  const files = e.target.files
  emit('update:files', [...attrs.files, ...Array.from(files)])
  e.target.value = null
}

export default {
  name: 'PostBoxFooter',
  emits: ['update:files', 'submit', 'update:giphy'],
}

</script>

<style lang="scss">
</style>
