<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <app-post-box></app-post-box>
            <kro-divider class="m-0" />

            <template v-for="post in posts">
                <app-post :post="post" :user="getters['auth/user']">
                    {{post.content}}
                </app-post>
                <kro-divider class="m-0" />
            </template>

            <div v-if="loading" class="flex flex-row items-center justify-center p-4">
                <kro-spinner></kro-spinner>
            </div>

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
    import { useAxios } from '/@app/composables/';
    import { useQuery, useResult } from '/@app/gql/composable';
    import gql from 'graphql-tag';

    export const { getters } = useStore();
    export const { start, loading, error, result } = useQuery(gql`
        {
            posts {
                nodes {
                    postId
                    userId
                    content
                    created
                    author {
                        userId
                        username
                        created
                        profile {
                            displayName
                        }
                    }
                }
            }
        }
    `);

    export const posts = useResult(result, null, data => data.posts.nodes);


    export default {
        name: 'Home',
    }
</script>

<style lang="scss">
    
    .app-sidebar-avatar {
        border: .5rem solid var(--kro-background-secondary);
    }

</style>