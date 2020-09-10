<template>
    <div>
        <template v-if="!noSkeleton && !prime && !error && posts.length === 0 && loading">
            <template v-for="i in 5">
                <app-post-skeleton />
                <kro-divider />
            </template>
        </template>
        <div v-else-if="posts.length > 0">
            <template v-for="post in posts" :key="post.id">
                <app-post :post="post" />
                <kro-divider v-if="!replyThread" class="m-0" />
            </template>

        </div>
        <div v-else-if="!hideEmptyMessage" class="feed-empty p-4 flex flex-col text-center items-center justify-center">
            <kro-icon icon="cactus" class="text-secondary" />
            <span class="text-sm font-medium">Fresh Outta Posts</span>
        </div>

        <div v-if="error" class="p-4 text-center flex flex-col justify-center">
            <span class="text-secondary font-bold text-sm">OOPSIE WOOPSIE!! UwU You made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to ban you!</span>
            <div class="mt-2">
                <kro-button @click="refetch">Try Again</kro-button>
            </div>
        </div>
        <app-self-intersection 
            v-if="hasNextPage" 
            @intersected="loadMore">
            <kro-button 
                class="w-full" 
                :loading="loading" 
                @click="loadMore">Load More</kro-button>
        </app-self-intersection>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref, watch } from 'vue';
    import { GET_POSTS, GET_NEW_POSTS } from '/~/apollo/query';
    import { useQuery, useResult } from '@black-kro/use-apollo';
    import { useElementVisibility } from '@vueuse/core';
    import { defaultPaginationUpdateQuery } from '/~/composables/usePagination';

    export const { result, loading, error, fetchMore, subscribeToMore } = useQuery<any, any>(GET_POSTS, {
        take: props.take || 10,
        parent: props.parent, 
        username: props.username
        }, {
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true
        });

    export const posts = useResult(result, [], data => data.posts.nodes);
    export const hasNextPage = useResult(result, true, data => data.posts.hasNextPage);
    export const next = useResult(result, null, data => data.posts.next);

    if (props.subscribeToMore) {
        subscribeToMore({
            document: GET_NEW_POSTS,
            updateQuery: defaultPaginationUpdateQuery('posts')
        })
    }

    export const loadMore = async () => {
        if (!loading.value && hasNextPage.value) {
            fetchMore({
                variables: {
                    take: props.take || 10,
                    after: next.value,
                    parent: props.parent,
                    username: props.username,
                    replies: props.replies
                },
                updateQuery: defaultPaginationUpdateQuery('posts')
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
        hideEmptyMessage?: boolean,
        noSkeleton?: boolean,
        subscribeToMore?: boolean,
        replies?: boolean,
        take?: number;
        preventAutoload?: boolean,
        prime: boolean,
    }
</script>

<style lang="scss">
    
    .feed-empty {
        --kro-icon-size: 5rem;
    }

</style>