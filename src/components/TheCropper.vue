<template>
    <div v-for="instance in cropperInstances">
        <kro-dialog
            class="max-w-6xl"
            v-model="instance.isOpen"
            @close-animation-end="instance.destroy()">

            <template #default="{ close }">
                <app-cropper 
                    :handle="{ resolve: (data) => { instance.resolve(data); close(); }, reject: (data) => { instance.reject(data); close(); } }"
                    :src="instance.src"
                    :croppedOptions="instance.croppedOptions"
                    :options="instance.options"/>
            </template>
        </kro-dialog>
    </div>
</template>

<script lang="ts" setup>
    export { cropperInstances } from '/~/composables/useCropper';


    export default {
        name: 'TheCropper'
    }
</script>

<style lang="scss">
    
</style>