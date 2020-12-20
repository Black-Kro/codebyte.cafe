<template>
  <div
    class="[ giphy-categroy ] cursor-pointer transform hover:scale-105 transition-transform ease-in-out duration-150 bg-black rounded-md relative overflow-hidden"
  >
    <app-lazy-image
      :src="gif.images.downsized_still.url"
      :intrinsic-width="1920"
      :intrinsic-height="1080"
    />
    <div
      ref="container"
      class="[ giphy-category__scrim ] absolute inset-0 flex items-center justify-center font-bold text-white"
    >
      <video
        v-if="isIntersecting"
        class="min-h-full min-w-full absolute object-cover"
        autoplay
        loop
        muted
        playsinline
        :src="gif.images.downsized_small.mp4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useIntersection } from '/~/composables'

export const container = ref()
export const { isIntersecting } = useIntersection(container, false)

export default {
  name: '',
  props: {
    gif: Object,
  },
}
</script>

<style lang="scss">
</style>
