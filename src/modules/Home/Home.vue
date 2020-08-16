<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <app-post-box></app-post-box>
            <kro-divider class="m-0" />
            <app-post-feed></app-post-feed>
        </kro-surface>

        <template #right>
            <!-- <kro-surface :padded="false">
                <user-me>
                    <template #me="{ me }">
                        <user-avatar :user="me" />
                        <div class="h-12">
                            <kro-avatar class="[ app-sidebar-avatar ] block mx-auto h-24 w-24 transform -translate-y-1/2" :src="me.profile.avatar" />
                        </div>
                        <div class="text-center pb-4 flex flex-col items-center">
                            <app-nickname :user="me" />
                            <span class="text-xs font-medium text-secondary">@{{me.username}}</span>
                        </div>
                    </template>
                </user-me>
            </kro-surface> -->
        </template>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useAxios } from '/@app/composables/';

    export const { getters } = useStore();


    export default {
        name: 'Home',
    }
</script>

<style lang="scss">
    
    .app-sidebar-avatar {
        border: .5rem solid var(--kro-background-secondary);
    }

</style>