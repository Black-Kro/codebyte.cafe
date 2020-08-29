<template>
    <div class="[ app-header ] [ overflow-hidden ]" :class="{ 'rounded-md': round }">
        <app-lazy-image
            v-if="user.profile && user.profile.header"
            class="w-full h-full block"
            :placeholder="user.profile.header.metadata.base64"
            :src="`${user.profile.header.url}?size=${700}`"
            :intrinsicWidth="1920"
            :intrinsicHeight="1080" />
        
        <app-lazy-image
            v-else
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1357&q=80"
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
            round: {
                type: Boolean,
                default: true,
            }
        }
    }
</script>

<style lang="scss">
    
</style>