<template>
  <div class="mt-2 pr-4">
    <div
      class="relative w-full rounded-md overflow-hidden"
      :style="{ 'padding-top': '56.25%' }"
    >
      <iframe
        :src="`${parameters}&parent=${hostname}&autoplay=false`"
        class="absolute inset-0 w-full h-full"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { computed } from 'vue'

declare const props: {
  url: string
}

export const hostname = window.location.hostname

export const parameters = computed(() => {
  if (props.url.includes('twitch.tv/videos')) {
    return `https://player.twitch.tv?video=${
      props.url.split('twitch.tv/videos/')[1]
    }`
  }

  if (props.url.includes('clips.twitch.tv')) {
    return `https://clips.twitch.tv/embed?clip=${
      props.url.split('clips.twitch.tv/')[1]
    }`
  }

  if (props.url.includes('twitch.tv')) {
    return `https://player.twitch.tv/?channel=${
      props.url.split('twitch.tv/')[1]
    }`
  }

  return ''
})

export default {
  name: 'AppTwitchPlayer',
}

</script>

<style lang="scss">
</style>
