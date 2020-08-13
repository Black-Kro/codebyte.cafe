<template>
    <div>
        <div v-if="posts">
            <template v-for="post in posts.nodes">
                <app-post :post="post">
                    {{post.content}}
                </app-post>
                <kro-divider class="m-0" />
            </template>
        </div>

        <div v-if="error" class="p-4 text-center flex flex-col justify-center">
            <span class="text-secondary font-bold text-sm">OOPSIE WOOPSIE!! UwU You made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to ban you!</span>
            <div class="mt-2">
                <kro-button @click="refetch">Try Again</kro-button>
            </div>
        </div>

        <div v-show="posts && posts.pageInfo.hasNextPage" ref="reloadButton" >
            <kro-button class="w-full" :loading="loading" @click="loadMore">Load More</kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { getPosts } from '/@app/gql/query';
    import { useQuery, useResult } from '/@app/gql/composable';
    import { useElementVisibility } from '@vueuse/core';

    export const { result, loading, error, refetch, fetchMore } = useQuery(getPosts, {}, {
        notifyOnNetworkStatusChange: true
    });
    export const posts = useResult(result, null, data => data.posts);

    export const reloadButton = ref(null);

    const isButtonVisible = useElementVisibility(reloadButton);

    watch(() => isButtonVisible.value, () => {
        if (!loading.value && posts.value.pageInfo.hasNextPage)
            loadMore();
    });

    export const loadMore = async () => {
        if (!loading.value && posts.value.pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    cursor: posts.value.pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.posts.edges;
                    const pageInfo = fetchMoreResult.posts.pageInfo;
                    const nodes = fetchMoreResult.posts.nodes;
    
                    return newEdges.length ? {
                        posts: {
                            __typename: previousResult.posts.__typename,
                            edges: [...previousResult.posts.edges, ...newEdges],
                            nodes: [...previousResult.posts.nodes, ...nodes],
                            pageInfo,
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