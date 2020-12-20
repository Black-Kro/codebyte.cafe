<template>
  <div v-if="user && !skeleton" class="p-4 flex flex-row items-center">
    <user-avatar v-if="avatar" :user="user" />
    <div class="flex flex-col pl-2 flex-1">
      <span class="text-foreground">{{ user.profile.nickname }}</span>
      <span class="text-foregroundSecondary text-xs font-bold">@{{ user.username }}</span>
    </div>
    <div>
      <slot />
    </div>
  </div>
  <div v-else>
    Skeleton Shit
  </div>
</template>

<script setup lang="ts">
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    avatar: {
      type: [Boolean, String],
      default: true,
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
