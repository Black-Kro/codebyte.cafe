<template>
    <div class="[ app-avatar ] [ w-12 h-12 ] [ rounded-full overflow-hidden ]">
        <app-lazy-image
            :placeholder="user.profile.avatarObject.base64"
            :src="`${user.profile.avatarObject.path}?width=48&height=48`"
            :intrinsicWidth="user.profile.avatarObject.width"
            :intrinsicHeight="user.profile.avatarObject.height" />
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'UserAvatar',
        props: {
            user: Object
        }
    }
</script>

<style lang="scss">
    
</style>