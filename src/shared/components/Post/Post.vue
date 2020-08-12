<template>
    <div class="app-post">
        <div class="flex flex-row items-center p-4">
            <kro-avatar :src="post.author.profile.avatar" />
            <div class="flex flex-col ml-4">
                <span>{{post.author.profile.displayName}}</span>
                <span class="text-xs text-secondary font-medium">@{{post.author.username}} · {{format(post.created)}}</span>
            </div>
            <span class="flex-1"></span>
            <kro-button icon="chevron-down"></kro-button>
        </div>

        <div class="px-4 py-2">
            <slot />
        </div>

        <div class="[ app-post-controls ] [ p-4 flex flex-row gap-2 ]">
            <kro-button icon="thumb-up-outline"></kro-button>
            <kro-button icon="thumb-down-outline"></kro-button>
            <kro-button icon="reply"></kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex';
    export { format } from 'timeago.js';

    export default {
        name: 'AppPost',
        props: {
            user: Object,
            post: Object,
        }
    }

</script>

<style lang="scss">

    .app-post-controls {

        .kro-button {
            width: 2rem;
            height: 2rem;

            --kro-icon-size: 1.25rem;
        }

    }

</style>