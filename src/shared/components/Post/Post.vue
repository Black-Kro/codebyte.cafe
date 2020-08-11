<template>
    <div class="app-post">
        <div class="flex flex-row items-center p-4">
            <kro-avatar :src="user.photoURL" />
            <div class="flex flex-col ml-4">
                <span>{{user.displayName}}</span>
                <span class="text-xs text-secondary font-medium">{{user.email}} · Just Now</span>
            </div>
            <span class="flex-1"></span>
            <kro-button icon="chevron-down"></kro-button>
        </div>

        <div class="px-4 py-2">
            Some Post Content I guess
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

    export default {
        name: 'AppPost',
        props: {
            user: Object
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