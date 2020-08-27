<template>
    <div>
        <user-identity skeleton></user-identity>
        <div class="px-4 grid gap-3">
            <span class="bg-primary h-3 block rounded-md w-full"></span>
            <span class="bg-primary h-3 block rounded-md w-4/5"></span>
            <span class="bg-primary h-3 block rounded-md w-5/6"></span>
            <span class="bg-primary h-3 block rounded-md w-1/2"></span>
        </div>
        <div class="px-4 pt-4 grid fit gap-2 app-post-skeleton-footer">
            <kro-squircle class="w-8 h-8 text-bg-primary" />
            <kro-squircle class="w-8 h-8 text-bg-primary" />
            <kro-squircle class="w-8 h-8 text-bg-primary" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: '',
    }
</script>

<style lang="scss">
    
    .app-post-skeleton-footer {
        grid-template-columns: repeat(auto-fit, minmax(0, min-content));
    }

</style>