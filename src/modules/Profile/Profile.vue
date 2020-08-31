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
                <app-post-feed :username="user.username"></app-post-feed>
            </template>

            <!-- Profile Skeleton -->

            <template v-else>
                <user-header :round="false" skeleton/>
                <kro-toolbar>
                    <div class="flex flex-row flex-1 pl-4 h-full items-center">
                        <div class="profile-avatar w-32 h-32 self-end bg-primary rounded-full"></div>
                        <user-identity class="pl-0" skeleton :avatar="false" />
                    </div>
                    <div class="px-4">
                        <kro-button><span class="opacity-0">Follow</span></kro-button>
                    </div>
                </kro-toolbar>
                <div class="px-4 grid gap-3 py-4">
                    <span class="bg-primary h-3 block rounded-md w-full"></span>
                    <span class="bg-primary h-3 block rounded-md w-4/5"></span>
                </div>
                <kro-toolbar small class="grid grid-flow-col text-center">
                    <div class="flex items-center justify-center h-full text-current">
                        <span class="text-sm font-medium bg-primary rounded-md w-24 h-3"></span>
                    </div>
                    <div class="flex items-center justify-center h-full text-current">
                        <span class="text-sm font-medium bg-primary rounded-md w-24 h-3"></span>
                    </div>
                    <div class="flex items-center justify-center h-full text-current">
                        <span class="text-sm font-medium bg-primary rounded-md w-24 h-3"></span>
                    </div>
                </kro-toolbar>
                <kro-divider class="my-0" />
                <app-post-feed skeleton></app-post-feed>
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