<template>
    <app-default-layout>
        <kro-surface :padded="false">

            <template v-if="user">
                <app-lazy-image 
                    class="bg-primary"
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1357&q=80"
                    :intrinsicWidth="1920"
                    :intrinsicHeight="1080"
                />

                <div class="user-profile__heading">
                    <kro-toolbar small>
                        <div class="flex flex-row pl-4 h-full">
                            <user-avatar :user="user" class="[ profile-avatar ] w-32 h-32 self-end" :size="128" />
                            <user-identity class="pl-0" :user="user" :avatar="false">
                                <template #title></template>
                            </user-identity>
                        </div>
                    </kro-toolbar>
                    <div class="px-4 pt-4 text-secondary text-xs font-bold">
                        <div class="flex flex-row items-center">
                            <kro-icon icon="calendar" />
                            <span class="ml-1">Joined {{format(user.created)}}</span>
                        </div>
                    </div>
                    <div class="px-4 pt-4 text-sm">
                        {{user.profile.bio}}
                    </div>
                    <kro-toolbar small class="grid grid-flow-col text-center">
                        <router-link class="flex items-center justify-center h-full text-current" :to="`/@${user.username}`">
                            <span class="text-sm font-medium">Posts</span>
                        </router-link>
                        <router-link class="flex items-center justify-center h-full text-current" :to="`/@${user.username}/following`">
                            <span class="text-sm font-medium">Following</span>
                        </router-link>
                        <router-link class="flex items-center justify-center h-full text-current" :to="`/@${user.username}/followers`">
                            <span class="text-sm font-medium">Followers</span>
                        </router-link>
                    </kro-toolbar>
                </div>
                <user-post-feed :username="user.username"></user-post-feed>
            </template>

        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { useQuery, useResult } from '/~/gql/composable';
    import { GET_PERSON } from '/~/gql/query';
    export { format } from 'timeago.js';

    export const { params: { username } } = useRoute();

    export const { loading, error, result } = useQuery(GET_PERSON, { username });
    export const user = useResult(result, null, u => u.user)

    export default {
        name: 'ProfileView',
    }
</script>

<style lang="scss">
    
    .user-profile__heading {
        --kro-icon-size: 1rem;

        border-bottom: 1px solid var(--kro-divider);
    }

    .profile-avatar {
        position: relative;
        border: 4px solid var(--kro-background-secondary);
    }

</style>