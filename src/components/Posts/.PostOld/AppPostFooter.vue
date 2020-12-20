<template>
  <div class="[ app-post-footer ] [ py-4 -ml-2 flex flex-row ]">
    <kro-button
      :key="post.likes"
      :class="{ 'reaction-active': post.liked }"
      class="h-8 bg-transparent text-foregroundSecondary"
      @click="react('LIKE')"
    >
      <kro-icon icon="mdi:arrow-up-thick" />
      <span>
        {{ post.likes }}
      </span>
    </kro-button>
    <kro-button
      :key="post.dislikes"
      :class="{ 'reaction-active': post.disliked }"
      class="h-8 bg-transparent text-foregroundSecondary"
      @click="react('DISLIKE')"
    >
      <kro-icon icon="mdi:arrow-down-thick" />
      <span>
        {{ post.dislikes }}
      </span>
    </kro-button>
    <kro-button
      v-if="post.level === 0"
      :to="`/@${post.author.username}/${post.id}`"
      class="h-8 bg-transparent text-foregroundSecondary"
    >
      <kro-icon icon="mdi:comment-multiple-outline" />
      {{ post.childCount > 0 ? post.childCount : "" }}
    </kro-button>
    <kro-button
      v-if="post.level === 1 || post.level === 2"
      class="h-8 bg-transparent text-foregroundSecondary"
      @click="isPostBoxOpen = true"
    >
      <kro-icon icon="mdi:comment-multiple-outline" />
      {{ post.childCount > 0 ? post.childCount : "" }}
    </kro-button>
    <span class="flex-1" />
    <kro-button
      class="h-8 bg-transparent text-foregroundSecondary"
      @click="viewReactions()"
    >
      <kro-icon icon="mdi:ballot" />
    </kro-button>
  </div>
  <kro-dialog
    v-slot="{ close }"
    v-model="isPostBoxOpen"
    class="w-full overflow-auto max-h-full p-0"
    :padded="false"
  >
    <app-post-box
      :initial-text="post.level === 2 ? `@${post.author.username} ` : ''"
      :parent="post.level === 2 ? post.parent.id : post.id"
      autofocus
      @posted="() => close()"
    />
  </kro-dialog>
  <kro-dialog v-model="isReactionsOpen" class="p-0 max-w-sm w-full">
    <div v-if="loading" class="flex flex-row justify-center items-center">
      <kro-spinner />
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      <span class="font-bold text-sm text-foregroundSecondary flex flex-row items-center">
        Reactions
      </span>
      <div
        v-for="reaction in reactions"
        :key="reaction.id"
        class="flex flex-row items-center"
      >
        <user-identity class="pl-0 flex-1" :user="reaction.user" />
        <kro-icon
          :icon="
            { LIKE: 'mdi:arrow-up-thick', DISLIKE: 'mdi:arrow-down-thick' }[
              reaction.type
            ]
          "
        />
      </div>

      <div v-if="reactions.length === 0" class="p-4 text-center">
        No Reactions 😔
      </div>
    </div>
  </kro-dialog>
</template>

<script lang="ts" setup="props">
import { computed, ref } from 'vue'
import { useMutation, useLazyQuery, useResult } from '@black-kro/use-apollo'
import { GET_REACTIONS } from '/~/apollo/query'
import { REACT_TO_POST } from '/~/apollo/mutation'

declare const props: {
  post: any
}

export const isPostBoxOpen = ref(false)
export const isReactionsOpen = ref(false)

const { mutate } = useMutation<any, { id: string; reaction: string }>(
  REACT_TO_POST,
)
export const { fetch, result, loading, error } = useLazyQuery<any, any>(
  GET_REACTIONS,
)
export const reactions = useResult(result, [], r => r.reactions.nodes)

export const totalLikes = computed(() => {
  return props.post.likes
})

export const totalDislikes = computed(() => {
  return props.post.dislikes
})

export const viewReactions = () => {
  isReactionsOpen.value = true
  fetch({ id: props.post.id })
}

export const react = async(type) => {
  const { post } = props

  let likes = post.likes
  let dislikes = post.dislikes

  if (post.liked) {
    likes--

    if (type === 'DISLIKE') dislikes++
  }
  else if (post.disliked) {
    dislikes--

    if (type === 'LIKE') likes++
  }
  else {
    if (type === 'LIKE') likes++

    if (type === 'DISLIKE') dislikes++
  }

  mutate(
    { id: post.id, reaction: type },
    {
      optimisticResponse: {
        react: {
          ...post,
          likes,
          dislikes,
          liked: !!(type === 'LIKE' && !post.liked),
          disliked: !!(type === 'DISLIKE' && !post.disliked),
        },
      },
    },
  )
}

export default {
  name: 'PostFooter',
}

</script>

<style lang="scss">
.app-post-footer {
  grid-template-columns: repeat(auto-fit, minmax(75px, min-content));

  .kro-button {
    --kro-icon-size: 1.25rem;

    place-content: unset;
    align-content: center;
    place-items: unset;

    .kro-button__content {
      justify-content: flex-start;
      place-items: unset;
    }
  }
}

.reaction-active {
  color: var(--kro-primary) !important;
}
</style>
