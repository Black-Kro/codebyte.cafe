<template>
  <div
    class="[ app-toast ] rounded-md bg-backgroundSecondary flex flex-row items-center mt-4"
  >
    <div class="p-4">
      <kro-icon :icon="icon" />
    </div>
    <div class="flex flex-1 flex-col py-2">
      <span>{{ title }}</span>
      <span class="text-foregroundSecondary font-medium text-sm">{{ message }}</span>
    </div>
    <div class="pl-4 pr-2">
      <kro-button class="text-foregroundSecondary" icon="mdi:close" @click="destroy" />
    </div>
  </div>
</template>

<script lang="ts" setup="props">
declare const props: {
  title: string
  message: string
  icon: string
  duration?: number
  destroy: any
}

if (props.duration) {
  setTimeout(() => {
    props.destroy()
  }, props.duration * 1000)
}

export default {
  name: 'AppToast',
}

</script>

<style lang="scss">
.app-toast {
  border: 1px solid var(--kro-divider);
}
</style>
