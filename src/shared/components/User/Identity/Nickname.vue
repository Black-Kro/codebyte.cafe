<template>
    <span class="flex flex-row items-center">
        <span class="[] [] [ text-primary ]">{{user.profile.displayName}}</span> 
        <kro-icon class="[ nickname-verified ] ml-2" v-if="user.verified" icon="verified" />
    </span>
</template>

<script lang="ts" setup>
    export default {
        name: 'UserNickname',
        props: {
            user: Object,
        }
    }
</script>

<style lang="scss">
    .nickname-verified {
        color: #ffd152;

        &:hover {
            animation: spin 500ms normal cubic-bezier(0.4, 0.0, 0.2, 1);
        }
    }

    @keyframes spin {
        from { transform: roate(0deg); }
        to { transform: roate(360deg); }
    }
</style>