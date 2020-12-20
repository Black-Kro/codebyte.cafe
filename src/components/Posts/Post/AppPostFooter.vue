<template>
  <div class="app-post-footer grid grid-flow-col gap-2 px-2 ml-14 py-4 text-foregroundSecondary">
    <!-- Upvote Counter -->
    <kro-button class="w-12 h-8 p-0 text-sm">
      <kro-icon icon="mdi:arrow-up-thick" />
      {{ post.likes }}
    </kro-button>

    <!-- Downvote Counter -->
    <kro-button class="w-12 h-8 p-0 text-sm">
      <kro-icon icon="mdi:arrow-down-thick" />
      {{ post.dislikes }}
    </kro-button>

    <!-- Replies Counter -->
    <kro-button class="w-12 h-8 p-0 text-sm">
      <kro-icon icon="mdi:chat" />
      {{ post.childCount }}
    </kro-button>
  </div>
</template>

<script setup="props" lang="ts">
declare const props: {
  post: any
}
</script>

<style>
  .app-post-footer {
    --kro-icon-size: 1.25rem;
    --kro-button-background: transparent;
    --kro-button-foreground: var(--kro-foreground-secondary);

    grid-auto-columns: min-content;
  }
</style>
