<template>
  <div v-bind="$attrs" class="relative">
    <user-me v-slot="{ me, loading }">
      <user-identity :user="me" :skeleton="loading">
        <kro-button icon="mdi:help-circle" @click="isHelpOpen = true" />
      </user-identity>
    </user-me>
    <app-post-box-textfield
      v-model="content"
      :autofocus="autofocus"
      :is-empty="content.length === 0"
    />

    <app-post-box-footer
      v-model:files="files"
      v-model:giphy="gif"
      :media="files"
      :content="content"
      @submit="onSubmit"
    />

    <app-post-box-media v-model:files="files" />

    <app-post-box-gif v-model:giphy="gif" />
    <div
      v-if="isLoading"
      class="[ post-box__loading-overlay ] [ absolute inset-0 w-full h-full ] [ flex flex-col items-center justify-center ]"
    >
      <kro-spinner />
      <span class="mt-4 text-sm font-medium">Creating Post</span>
    </div>
  </div>

  <kro-dialog v-model="isHelpOpen" class="max-w-md w-full">
    <app-post-box-help />
    <template #footer="{ close }">
      <span class="flex-1" />
      <kro-button @click="close">
        Close
      </kro-button>
    </template>
  </kro-dialog>
</template>

<script lang="ts" setup="props, { emit }">
import { ref } from 'vue'
import { useMedia } from '/~/composables'
import { useMutation } from '@black-kro/use-apollo'
import { CREATE_POST } from '/~/apollo/mutation'
import { GET_POSTS } from '/~/apollo/query'

declare const props: {
  autofocus?: boolean
  parent?: string
  initialText?: string
}

declare const emit: any

export const isHelpOpen = ref(false)

export const content = ref(props.initialText || '')
export const files = ref([])
export const gif = ref<any>(null)
export const isLoading = ref(false)
export const textfield = ref<any>(null)

const { uploadMedia } = useMedia()
const { mutate } = useMutation<
any,
{ content: string; media: string[]; giphy: string[]; parent?: string }
>(CREATE_POST, {
  update(cache, { data }) {
    try {
      const query = cache.readQuery({
        query: GET_POSTS,
        variables: { parent: props.parent },
      }) as any

      if (
        query.posts.nodes.filter(p => p.id === data.createPost.id).length
        === 0
      ) {
        const nodes = [data.createPost, ...query.posts.nodes]
        cache.writeQuery({
          query: GET_POSTS,
          variables: { parent: props.parent },
          data: {
            ...query,
            posts: {
              ...query.posts,
              nodes,
            },
          },
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  },
})

export const onSubmit = async() => {
  isLoading.value = true

  try {
    const media = await uploadMedia(files.value)
    await mutate({
      content: content.value,
      media,
      giphy: [gif.value && (gif.value as any).id].filter(x => x),
      parent: props.parent,
    })

    // Finish Up
    content.value = ''
    files.value = []
    gif.value = null
    emit('posted')
  }
  catch (error) {
  }
  finally {
    isLoading.value = false
  }
}

export default {
  name: 'AppPostBox',
  emits: ['posted'],
}

</script>

<style lang="scss">
.post-box {
  &__loading-overlay {
    background: rgba(0, 0, 0, 0.48);
    backdrop-filter: blur(5px);
  }
}
</style>
