<template>
    <div class="flex flex-col mt-4">
        <div class="[ flex flex-wrap justify-center gap-2 ] [ text-sm font-medium text-secondary ]">
            <router-link class="text-current" to="/">About</router-link>
            <router-link class="text-current" to="/">Help</router-link>
            <router-link class="text-current" to="/">Blog</router-link>
            <router-link class="text-current" to="/terms-of-service">Terms of Service</router-link>
            <router-link class="text-current" to="/privacy-policy">Privacy Policy</router-link>
        </div>
        <img class="h-8 opacity-50 mt-4" src="/@app/shared/assets/Logo.svg" />
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'TheFooter',
    }
</script>

<style lang="scss">
    
</style>