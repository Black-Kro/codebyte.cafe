<template>
  <div>
    <!-- Display the users avatar, username, and nickname -->
    <user-identity :user="author">
      <!-- Display formatted date of when post was created -->
      <template #subtitle>
        · {{ format(date) }}
      </template>

      <!-- Display menu for handling post actions such as deleting and reporting -->
      <template #default>
        <kro-menu left>
          <template #activator="{ open }">
            <kro-button icon="mdi:chevron-down" class="w-7 h-7" @click="open" />
          </template>
          <div>
            <div v-for="item in menu" :key="item.title" class="cursor-pointer" @click="item.action">
              <kro-list-item v-if="item.shouldShow()">
                <template #icon>
                  <kro-icon :icon="item.icon" />
                </template>
                {{ item.title }}
              </kro-list-item>
            </div>
          </div>
        </kro-menu>
      </template>
    </user-identity>
  </div>
</template>

<script setup="props" lang="ts">
import { ref } from 'vue'
import { usePost } from '/~/apollo/api'
import { useDialog } from '@black-kro/ui'
export { format } from 'timeago.js'

declare const props: {
  author: any
  date: string
  post: any
}

const { createDialog } = useDialog()
const { canDeletePost, deletePost } = usePost(props.post)

export const menu = ref([
  {
    title: 'Delete',
    icon: 'mdi:delete',
    action: () => {
      createDialog({
        title: 'Delete Post?',
        message: 'Are you sure you want to delete this post?',
        icon: 'mdi:alert',
        style: 'centered',
        resolveButton: { text: 'Delete' },
        rejectButton: { text: 'Cancel' },
      })
        .then(() => deletePost())
    },
    shouldShow() {
      return canDeletePost
    },
  },
  {
    title: 'Report',
    icon: 'mdi:alert',
    action: () => {},
    shouldShow() {
      return true
    },
  },
])

</script>
