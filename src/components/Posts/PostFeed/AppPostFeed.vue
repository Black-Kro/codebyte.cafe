<template>
    <div>
        <template v-if="!posts">
            <template v-for="i in 5">
                <app-post-skeleton />
                <kro-divider />
            </template>
        </template>
        <div v-if="posts">
            <template v-for="post in posts.nodes" :key="post.id">
                <app-post :post="post" />
                <kro-divider class="m-0" />
            </template>
        </div>

        <div v-if="error" class="p-4 text-center flex flex-col justify-center">
            <span class="text-secondary font-bold text-sm">OOPSIE WOOPSIE!! UwU You made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to ban you!</span>
            <div class="mt-2">
                <kro-button @click="refetch">Try Again</kro-button>
            </div>
        </div>

        <div v-show="posts && posts.hasNextPage" ref="reloadButton" >
            <kro-button class="w-full" :loading="loading" @click="loadMore">Load More</kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { GET_POSTS } from '/~/gql/query';
    import { useQuery, useResult } from '/~/gql/composable';
    import { useElementVisibility } from '@vueuse/core';

    export const { result, loading, error, refetch, fetchMore } = useQuery(GET_POSTS, {}, {
        notifyOnNetworkStatusChange: true
    });
    export const posts = useResult(result, null, data => data.posts);

    export const reloadButton = ref(null);

    const isButtonVisible = useElementVisibility(reloadButton);

    watch(() => isButtonVisible.value, () => {
        if (!loading.value && posts.value.hasNextPage)
            loadMore();
    });

    export const loadMore = async () => {
        if (!loading.value && posts.value.hasNextPage) {
            fetchMore({
                variables: {
                    after: posts.value.next
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const next = fetchMoreResult.posts.next;
                    const nodes = fetchMoreResult.posts.nodes;
                    const hasNextPage = fetchMoreResult.posts.hasNextPage;
    
                    return next ? {
                        posts: {
                            __typename: previousResult.posts.__typename,
                            nodes: [...previousResult.posts.nodes, ...nodes],
                            hasNextPage,
                            next,
                        }
                    } : previousResult;
                }
            });
        }
    };

    export default {
        name: 'AppPostFeed',
    }
</script>

<style lang="scss">
    
</style>