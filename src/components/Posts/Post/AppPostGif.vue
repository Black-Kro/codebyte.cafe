<template>
  <div>
    <div v-for="gif in gifs" :key="gif.id" class="relative">
      <app-lazy-image
        :intrinsic-width="gif.images.original.width"
        :intrinsic-height="gif.images.original.height"
      />
      <video
        class="absolute inset-0 h-full object-cover w-full rounded-md"
        autoplay
        loop
        muted
        playsinline
        :src="gif.images.original.mp4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
export default {
  name: '',
  props: {
    gifs: Array,
  },
}
</script>

<style lang="scss">
</style>
