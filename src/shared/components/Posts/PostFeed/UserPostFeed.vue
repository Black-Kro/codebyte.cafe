<template>
    <div>
        <div v-if="posts">
            <template v-for="post in posts.nodes">
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
        <div v-show="posts && posts.pageInfo.hasNextPage" ref="reloadButton" >
            <kro-button class="w-full" :loading="loading" @click="loadMore">Load More</kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref, watch } from 'vue';
    import { GET_POSTS_BY_USER } from '/@app/gql/query';
    import { useQuery, useResult } from '/@app/gql/composable';
    import { useElementVisibility } from '@vueuse/core';

    export const { result, loading, error, refetch, fetchMore } = useQuery<any, any>(GET_POSTS_BY_USER, { username: props.username }, {
        notifyOnNetworkStatusChange: true
    });
    export const posts = useResult(result, null, data => data.postByUser);

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
                    usernmae: props.username,
                    cursor: posts.value.pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.postByUser.edges;
                    const pageInfo = fetchMoreResult.postByUser.pageInfo;
                    const nodes = fetchMoreResult.postByUser.nodes;
    
                    return newEdges.length ? {
                        postsByUser: {
                            __typename: previousResult.postByUser.__typename,
                            edges: [...previousResult.postByUser.edges, ...newEdges],
                            nodes: [...previousResult.postByUser.nodes, ...nodes],
                            pageInfo,
                        }
                    } : previousResult;
                }
            });
        }
    };

    export default {
        name: 'AppUserPostFeed',
    }

    declare const props: {
        username: string;
    }
</script>

<style lang="scss">
    
</style>