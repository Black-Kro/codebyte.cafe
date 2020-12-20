<template>
  <div ref="self">
    <app-post-header :post="post" :author="post.author" :date="post.created" />
    <app-post-content :post="post" />
    <app-post-footer :post="post" />
  </div>
</template>

<script setup="props" lang="ts">
import { ref } from 'vue'
import { useIntersection } from '/~/composables'
// import { useSubscription } from '@black-kro/use-apollo'

export const self = ref<HTMLElement | null>(null)
export const { onIntersected, onNotIntersected } = useIntersection(self, false)

// subscribe to changes for post
onIntersected(() => {})

// unsubscribe from changes on post
onNotIntersected(() => {})

declare const props: {
  post: any
}
</script>
