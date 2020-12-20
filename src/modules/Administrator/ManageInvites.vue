<template>
  <app-default-layout>
    <kro-surface :padded="false">
      <kro-list-item>
        <template #icon>
          <kro-icon icon="mdi:add" />
        </template>
        Create Invites
        <template #subtitle>
          Create an invite for new users
        </template>
        <template #action>
          <kro-dialog v-model="isDialogOpen">
            <template #activator="{ open }">
              <kro-button @click="open">
                Create
              </kro-button>
            </template>
            <template #default>
              <span class="font-bold text-lg">Create Invite</span>
              <p class="text-foregroundSecondary text-sm pt-2 max-w-sm">
                Create a new invite to send to users. Below you can select roles
                that will be automatically applied to user who join with the
                invite code as well as how many invites you would like to
                create.
              </p>

              <div class="[ create-invite ] py-4">
                <div class="text-sm text-foregroundSecondary font-bold">
                  Roles
                </div>
                <div class="flex flex-col">
                  <kro-switch v-model="roles" value="Admin">
                    Admin
                  </kro-switch>
                </div>
              </div>
              <div>
                <div class="text-sm text-foregroundSecondary font-bold pb-2">
                  Amount to create
                </div>
                <kro-slider
                  v-model="amount"
                  ticks
                  :steps="1"
                  :max="10"
                  :min="1"
                />
              </div>
            </template>
            <template #footer="{ close }">
              <span class="flex-1" />
              <kro-button @click="close">
                {{ $t("common.Cancel") }}
              </kro-button>
              <kro-button
                :loading="isCreateLoading"
                primary
                @click="onCreateInvites(close)"
              >
                {{ $t("common.Create") }} {{ amount }}
              </kro-button>
            </template>
          </kro-dialog>
        </template>
      </kro-list-item>
      <kro-divider class="my-0" />
      <div class="py-4">
        <div class="px-4 text-sm font-bold text-foregroundSecondary">
          Exisiting Invits
        </div>
        <kro-list-item v-for="invite in invites" :key="invite.id">
          {{ invite.code }}
          <template #subtitle>
            <span>Created by @{{ invite.createdBy.username }}</span>
            <span class="mx-2">·</span>
            <span>Roles:
              {{
                invite.initialRoles.length > 0
                  ? invite.initialRoles.join(", ")
                  : "None"
              }}</span>
            <span class="mx-2">·</span>
            <span>Created {{ format(invite.createdAt) }}</span>
          </template>
          <template #action>
            <kro-button icon="mdi:delete" @click="deleteInvite(invite.id)" />
          </template>
        </kro-list-item>
      </div>
    </kro-surface>
  </app-default-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuery, useResult } from '@black-kro/use-apollo'
import { GET_INVITES } from '/~/apollo/query'
import { useAdmin } from '/~/apollo/api'
export { format } from 'timeago.js'

export const { createInvites, deleteInvite } = useAdmin()

export const roles = ref([])
export const amount = ref(1)

export const isDialogOpen = ref(false)
export const isCreateLoading = ref(false)

export const { result, loading, error } = useQuery(GET_INVITES)
export const invites = useResult(result, [], r => r.invites.nodes)

export const onCreateInvites = async(done) => {
  isCreateLoading.value = true
  await createInvites(amount.value, roles.value)
  isCreateLoading.value = false
  done()
}

export default {
  name: 'ManageInvitesView',
}
</script>

<style lang="scss">
.create-invite {
  --kro-switch-track-background: rgba(0, 0, 0, 0.24);
}
</style>
