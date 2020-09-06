<template>
    <div class="fixed bottom-0 right-0 p-4 max-w-md">
        <app-toast
            v-for="toast in toastInstances"
            :title="toast.title"
            :message="toast.message"
            :icon="toast.icon"
            :duration="toast.duration"
            :destroy="toast.destroy"
         />
    </div>
</template>

<script lang="ts" setup>
    export { toastInstances } from '/~/composables/useToast';

    export default {
        name: '',
    }
</script>

<style lang="scss">
    
</style>