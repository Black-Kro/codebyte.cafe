<template>
    <div class="container mx-auto p-4 h-full flex flex-row items-center justify-center">
        <kro-alert type="success">
            <div class="flex flex-row items-center">
                Welcome to your new app! To get started, edit this page in /src/modules/Home/Home.vue
                <span class="flex-1"></span>
                <kro-button class="ml-4" outline href="https://ui.black-kro.dev">UI Documentation</kro-button>
            </div>
        </kro-alert>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'Home',
    }
</script>

<style lang="scss">
    
</style>