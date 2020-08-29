<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <div v-if="loading"><app-post-skeleton /></div>
            <div v-else-if="source">
                <app-post :post="source"></app-post>
            </div>
            <kro-divider class="mt-0" />
            <div class="px-4 py-2 bg-primary rounded-md mx-4 flex flex-row items-center cursor-pointer">
                <user-me #me="{ me }">
                    <user-avatar :size="32" :user="me" />
                    <span class="text-secondary ml-2 font-medium text-sm">Reply...</span>
                </user-me>
            </div>
            <kro-divider class="mb-0" />
            <app-post-feed v-if="source" :parent="source.id" />
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { useQuery, useResult } from '/~/gql/composable';
    import { GET_POST } from '/~/gql/query';

    export const { params: { username, post } } = useRoute();

    export const { loading, error, result } = useQuery(GET_POST, { id: post });
    export const source = useResult(result, null, p => p.post);


    export default {
        name: 'ProfilePost',
    }
</script>

<style lang="scss">
    
</style>