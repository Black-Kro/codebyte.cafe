<template>
  <app-default-layout>
    <kro-surface class="report">
      <div v-if="loading" class="p-4 flex flex-row items-center justify-center">
        <kro-spinner />
      </div>
      <div
        v-else-if="error"
        class="text-foregroundSecondary text-sm font-medium text-center"
      >
        {{ error }}
      </div>
      <div v-else>
        <div class="grid grid-cols-3 pb-4 gap-4">
          <div class="col-span-2 bg-primary rounded-md p-4">
            <div>{{ report.content }}</div>
          </div>
          <div class="grid gap-3">
            <div class="flex flex-col">
              <span
                class="text-foregroundSecondary text-xs font-medium"
              >Repot Status</span>
              <span>{{
                ["Open", "Closed", "Resolved"][report.reportStatus]
              }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-foregroundSecondary text-xs font-medium">Repot Type</span>
              <span>{{ report.reportType }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-foregroundSecondary text-xs font-medium">Repot Time</span>
              <span>{{ format(report.created) }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-foregroundSecondary text-xs font-medium">Repoted By</span>
              <div class="py-1 flex flex-row items-center">
                <user-avatar :size="36" :user="report.author" />
                <div class="flex flex-col">
                  <span class="ml-2 text-sm">{{
                    report.author.profile.nickname
                  }}</span>
                  <span
                    class="ml-2 text-foregroundSecondary text-xs"
                  >@{{ report.author.username }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <span class="text-foregroundSecondary text-xs font-medium">Content</span>
              <router-link
                class="block mt-1 text-sm"
                :to="`/@unknown/${report.reportedContentId}`"
              >
                View Reported Content
              </router-link>
            </div>
          </div>
        </div>

        <kro-divider />

        <div class="flex flex-row">
          <span class="flex-1" />
          <kro-button>Close</kro-button>
          <kro-button class="ml-2" primary>
            Resolve
          </kro-button>
        </div>
      </div>
    </kro-surface>
  </app-default-layout>
</template>

<script lang="ts" setup>
import { useQuery, useResult } from '@black-kro/use-apollo'
import { useRoute } from 'vue-router'
import { GET_REPORT } from '/~/apollo/query'
export { format } from 'timeago.js'

export const {
  params: { id },
} = useRoute()

export const { result, loading, error } = useQuery(GET_REPORT, { id })
export const report = useResult(result, null, r => r.report)

export default {
  name: '',
}
</script>

<style lang="scss">
</style>
