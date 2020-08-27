<template>
    <div class="[ app-header ] [ rounded-md overflow-hidden ]">
        <app-lazy-image
            v-if="user.profile && user.profile.header"
            class="w-full h-full block"
            :placeholder="user.profile.header.metadata.base64"
            :src="`${user.profile.header.url}?size=${700}`"
            :intrinsicWidth="1920"
            :intrinsicHeight="1080" />
        
        <app-lazy-image
            v-else
            class="bg-primary"
            :intrinsicWidth="1920"
            :intrinsicHeight="1080" />
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'UserHeader',
        props: {
            user: Object,
        }
    }
</script>

<style lang="scss">
    
</style>