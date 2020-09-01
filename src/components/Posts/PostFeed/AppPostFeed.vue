<template>
    <div>
        <template v-if="!posts || skeleton">
            <template v-for="i in 5">
                <app-post-skeleton />
                <kro-divider />
            </template>
        </template>
        <div v-else-if="posts">
            <template v-for="post in posts.nodes" :key="post.id">
                <app-post :post="post" />
                <kro-divider v-if="!replyThread" class="m-0" />
            </template>

            <div class="feed-empty p-4 flex flex-col text-center items-center justify-center" v-if="posts.nodes.length === 0">
                <kro-icon icon="cactus" class="text-secondary" />
                <span class="text-sm font-medium">Fresh Outta Posts</span>
            </div>
        </div>

        <div v-if="error" class="p-4 text-center flex flex-col justify-center">
            <span class="text-secondary font-bold text-sm">OOPSIE WOOPSIE!! UwU You made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to ban you!</span>
            <div class="mt-2">
                <kro-button @click="refetch">Try Again</kro-button>
            </div>
        </div>
        <div v-show="posts && posts.hasNextPage" ref="reloadButton" class="p-4">
            <kro-button class="w-full" :key="loading" :loading="loading" @click="loadMore">Load More</kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref, watch } from 'vue';
    import { GET_POSTS, GET_NEW_POSTS } from '/~/gql/query';
    import { useQuery, useResult } from '/~/gql/composable';
    import { useElementVisibility } from '@vueuse/core';

    export const { result, loading, error, refetch, fetchMore, subscribeToMore } = useQuery<any, any>(GET_POSTS, {
        take: props.take || 10,
        parent: props.parent, 
        username: props.username
        }, {
            notifyOnNetworkStatusChange: true
        });

    export const posts = useResult(result, null, data => data.posts);
    export const reloadButton = ref(null);

    const isButtonVisible = useElementVisibility(reloadButton);

    if (props.subscribeToMore) {
        subscribeToMore({
            document: GET_NEW_POSTS,
            updateQuery: (previousValue, { subscriptionData }) => {
                const post = subscriptionData.data.newPosts;

                if (posts.value.nodes.filter(p => p.id === post.id).length > 0)
                    return previousValue;

                return {
                    posts: {
                        ...previousValue.posts,
                        nodes: [
                            post,
                            ...previousValue.posts.nodes
                        ]
                    }
                };
            }
        })
    }

    watch(() => isButtonVisible.value, () => {
        if (!loading.value && posts.value.hasNextPage && !props.preventAutoload)
            loadMore();
    });

    export const loadMore = async () => {
        if (!loading.value && posts.value.hasNextPage) {
            fetchMore({
                variables: {
                    take: props.take || 10,
                    after: posts.value.next,
                    parent: props.parent,
                    username: props.username,
                    replies: props.replies
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

    declare const props: {
        parent?: string,
        username?: string;
        replyThread?: boolean,
        skeleton?: boolean,
        subscribeToMore?: boolean,
        replies?: boolean,
        take?: number;
        preventAutoload?: boolean
    }
</script>

<style lang="scss">
    
    .feed-empty {
        --kro-icon-size: 5rem;
    }

</style>