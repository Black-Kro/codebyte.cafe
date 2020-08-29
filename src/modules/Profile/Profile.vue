<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <template v-if="user">
                <user-header :round="false" :user="user" />

                <div class="user-profile__heading">
                    <kro-toolbar>
                        <div class="flex flex-row flex-1 pl-4 h-full items-center">
                            <user-avatar :user="user" class="[ profile-avatar ] w-32 h-32 self-end" :size="128" />
                            <user-identity class="pl-0" :user="user" :avatar="false">
                                <template #title></template>
                            </user-identity>
                        </div>
                        <div class="px-4">
                            <kro-button>Follow</kro-button>
                        </div>
                    </kro-toolbar>
                    <div class="px-4 pt-4 text-sm">
                        <app-minimal-markdown :content="user.profile.bio" />
                    </div>
                    <div class="px-4 pt-4 text-secondary text-xs font-bold">
                        <div class="flex flex-row items-center">
                            <kro-icon icon="calendar" />
                            <span class="ml-1">Joined {{format(user.created)}}</span>
                        </div>
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