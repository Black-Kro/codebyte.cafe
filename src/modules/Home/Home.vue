<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <app-post-box></app-post-box>
            <kro-divider class="m-0" />

            <template v-for="i in 30">
                <app-post
                    :user="getters['auth/user']">
                </app-post>
                <kro-divider class="m-0" />
            </template>
        </kro-surface>

        <template #right>
            <kro-surface :padded="false">
                <img class="h-24 w-full object-cover" src='https://images.unsplash.com/photo-1501560379-05951a742668?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80' alt=''/>
                <div class="h-12">
                    <kro-avatar class="[ app-sidebar-avatar ] block mx-auto h-24 w-24 transform -translate-y-1/2" :src="getters['auth/user'].photoURL" />
                </div>
                <div class="text-center pb-4">
                    {{getters['auth/user'].displayName}}
                    <span class="text-xs font-medium text-secondary">{{getters['auth/user'].email}}</span>
                </div>
            </kro-surface>
        </template>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';

    export const { getters } = useStore();
    export const height = ref(0);

    export default {
        name: 'Home',
    }
</script>

<style lang="scss">
    
    .app-sidebar-avatar {
        border: .5rem solid var(--kro-background-secondary);
    }

</style>