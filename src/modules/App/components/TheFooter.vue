<template>
    <footer class="container mx-auto p-4 flex flex-row justify-center">
        <div class="flex flex-col justify-center items-center content-center">
            <app-logo class="h-8 opacity-75" />
            <div class="py-2 text-sm">
                <router-link class="text-current" to="/">About</router-link>
                <span class="mx-2">·</span>
                <router-link class="text-current" to="/">Help</router-link>
                <span class="mx-2">·</span>
                <a href="https://blog.codebyte.cafe/" rel="noreferrer noopener" target="_blank" class="text-current" to="/">Blog</a>
                <span class="mx-2">·</span>
                <router-link class="text-current" to="/terms-of-service">Terms of Service</router-link>
                <span class="mx-2">·</span>
                <router-link class="text-current" to="/privacy-policy">Privacy Policy</router-link>
            </div>
            <span class="text-xs font-medium">&copy; {{new Date().getFullYear()}} Codebyte</span>
        </div>
    </footer>
</template>

<script lang="ts" setup>
    export default {
        name: 'TheFooter',
    }
</script>

<style lang="scss">
    
</style>