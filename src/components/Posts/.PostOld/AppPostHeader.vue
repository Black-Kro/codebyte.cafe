<template>
  <user-identity
    :avatar="false"
    class="pl-0"
    :to="`/@${post.author.username}`"
    :user="post.author"
  >
    <template #subtitle>
      · {{ format(post.created) }}
    </template>
    <template #default>
      <div class="flex flex-row items-center h-full">
        <kro-menu :key="post.id" left>
          <template #activator="{ open }">
            <kro-button
              class="w-8 h-8 self-center"
              icon="mdi:chevron-down"
              @click="open"
            />
          </template>
          <div>
            <kro-dialog v-model="isReportDialogOpen">
              <template #activator="{ open }">
                <kro-list-item class="cursor-pointer" @click="open">
                  <template #icon>
                    <kro-icon icon="mdi:alert" />
                  </template>
                  {{ $t("posts.ReportPost") }}
                </kro-list-item>
              </template>
              <template #header>
                <div class="flex flex-row">
                  <kro-icon icon="mdi:alert" class="mr-2" />
                  {{ $t("statements.ReportPostTitle") }}
                </div>
              </template>
              <div>
                <p class="text-foregroundSecondary font-medium pb-4">
                  {{ $t("statements.ReportDescription") }}
                </p>
                <kro-textfield v-model="reportText" multiline label="Reason" />
              </div>
              <template #footer="{ close }">
                <span class="flex-1" />
                <kro-button @click="close">
                  {{
                    $t("common.Cancel")
                  }}
                </kro-button>
                <kro-button
                  :disabled="reportText.length === 0"
                  primary
                  @click="reportPost(close)"
                >
                  {{ $t("posts.ReportPost") }}
                </kro-button>
              </template>
            </kro-dialog>
            <kro-list-item
              v-if="canDeletePost"
              class="cursor-pointer"
              @click="beforeDeletePost"
            >
              <template #icon>
                <kro-icon icon="mdi:delete" />
              </template>
              {{ $t("posts.DeletePost") }}
            </kro-list-item>
          </div>
        </kro-menu>
      </div>
    </template>
  </user-identity>
</template>

<script lang="ts" setup="props">
import { ref } from 'vue'
import { useContent, usePost } from '/~/apollo/api'
import { useDialog } from '@black-kro/ui'

declare const props: {
  post: any
}

export { format } from 'timeago.js'

export const isReportDialogOpen = ref(false)
export const reportText = ref('')

const { createConfirmationDialog } = useDialog()

export const { deletePost, canDeletePost } = usePost(props.post)
export const { createContentReport } = useContent()

export const beforeDeletePost = async() => {
  createConfirmationDialog({
    title: 'Delete Post?',
    message: 'Are you sure you want to delete this post?',
    icon: 'mdi:alert',
    style: 'centered',
    resolveButton: {
      text: 'Delete',
      attributes: { error: true },
    },
  }).then(() => {
    deletePost()
  })
}

export const reportPost = async(done) => {
  await createContentReport(reportText.value, props.post.id, 'Post')
  done()
}

export default {
  name: 'PostHeader',
}

</script>

<style lang="scss">
</style>
