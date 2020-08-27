<template>
    <app-default-layout>
        <!-- <kro-surface :padded="false">
            <template v-if="loading">

            </template>
            <template v-else-if="error">

            </template>
            <template v-else>
                <app-lazy-image
                    placeholder="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=12&q=80"
                    :src="user.profile.headerImage"
                    :intrinsicWidth="1920"
                    :intrinsicHeight="1080"
                 />

                 <kro-toolbar class="relative bg-primary" padded>
                     <div class="flex flex-row items-end h-full">
                         <div class="bg-primary p-2 rounded-full">
                            <kro-avatar class="w-32 h-32" :src="user.profile.avatar" />
                         </div>
                     </div>
                     <div>
                         <app-nickname :user="user" />
                         <span class="text-xs font-bold text-secondary">@{{user.username}}</span>
                     </div>
                 </kro-toolbar>
                 <div>
                    <app-user-post-feed :username="user.username" />
                 </div>
            </template>
        </kro-surface> -->
    </app-default-layout>
</template>

<script lang="ts" setup>
    // import { useRoute } from 'vue-router';
    // import { useQuery, useResult } from '/~/gql/composable';
    // import { GET_USER_FROM_NAME } from '/~/gql/query';

    // export const { params } = useRoute();
    // export const { username } = params;

    // export const { loading, error, result } = useQuery(GET_USER_FROM_NAME, { username });
    // export const user = useResult(result, null, x => x.userFromName);

    export default {
        name: 'ProfileView',
    }
</script>

<style lang="scss">
    
</style>