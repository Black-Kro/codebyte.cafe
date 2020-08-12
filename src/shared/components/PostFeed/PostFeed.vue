<template>
    <div>
        
        <div v-if="posts">
            <template v-for="post in posts">
                <app-post :post="post">
                    {{post.content}}
                </app-post>
                <kro-divider />
            </template>
        </div>

        <div v-if="error" class="p-4 text-center flex flex-col justify-center">
            <span class="text-secondary font-bold text-sm">OOPSIE WOOPSIE!! UwU You made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to ban you!</span>
            <div class="mt-2">
                <kro-button @click="refetch">Try Again</kro-button>
            </div>
        </div>

        <div v-if="loading" class="p-4 flex flex-row items-center justify-center">
            <kro-spinner></kro-spinner>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { getPosts } from '/@app/gql/query';
    import { useQuery, useResult } from '/@app/gql/composable';

    export const { result, loading, error, refetch } = useQuery(getPosts);
    export const posts = useResult(result, null, data => data.posts.nodes);

    export default {
        name: 'AppPostFeed',
    }
</script>

<style lang="scss">
    
</style>