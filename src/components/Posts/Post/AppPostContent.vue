<template>
  <div class="app-post-content px-4 ml-14">
    <app-post-renderer :content="post.text" />
    <app-post-media v-if="post.media" :media="post.media" />
    <app-post-gif v-if="post.externalMedia" :gifs="post.externalMedia" />
  </div>
</template>

<script setup="props" lang="ts">
import AppPostRenderer from './AppPostRenderer'

declare const props: {
  post: any
}

export default {
  components: { AppPostRenderer },
}
</script>

<style>
.app-post-content a {
  color: var(--kro-primary);
}
</style>
