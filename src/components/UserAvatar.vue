<template>
    <div class="[ app-avatar ] [ rounded-full overflow-hidden ]" :style="{ width: `${size}px`, height: `${size}px` }">
        <app-lazy-image
            v-if="user.profile.avatar"
            class="w-full h-full block"
            :placeholder="user.profile.avatar.metadata.base64"
            :src="`${user.profile.avatar.url}?width=${size}&height=${size}`"
            :intrinsicWidth="user.profile.avatar.metadata.width"
            :intrinsicHeight="user.profile.avatar.metadata.height" />
        <img
            v-else
            class="w-full h-full block"
            :src="`https://avatars.dicebear.com/api/bottts/${user.username}.svg`">
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'UserAvatar',
        props: {
            user: Object,
            size: {
                type: Number,
                default: 48,
            }
        }
    }
</script>

<style lang="scss">
    
    .app-avatar {
        -webkit-mask-image: -webkit-radial-gradient(white, black);
    }

</style>