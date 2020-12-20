<template>
    <app-default-layout>
        <kro-surface :padded="false">
            
            <!-- Skeleton -->
            
            <div v-if="loading">
                <app-post-skeleton />
                <kro-divider />
                <div class="px-4 py-2 bg-primary rounded-md mx-4">
                    <div class="h-8 w-8"></div>
                </div>
                <kro-divider />
                <app-post-skeleton />
                <app-post-skeleton />
                <app-post-skeleton />
            </div>

            <!-- Error -->

            <div v-else-if="error || !source" class="p-4 text-center flex flex-col font-bold text-sm text-foregroundSecondary">
                Oops, there was an error displaying this post.
                <router-link class="pt-2" to="/">Return Home</router-link>
            </div>

            <!-- Render Post -->

            <div v-else>

                <!-- {{source.parent}} -->
                <template v-if="source.parent">
                    <router-link :to="`/@${source.parent.author.username}/${source.parent.id}`" class="flex flex-row items-center p-4 text-foregroundSecondary">
                        <kro-icon icon="mdi:arrow-up-thick" class="mr-2" />
                        <div class="text-sm font-medium">
                            <span>
                                Go up to original post
                            </span>
                        </div>
                    </router-link>
                    <kro-divider class="m-0" />
                </template>
                <app-post :post="source" />
                <template v-if="source.level === 0">
                    <kro-divider class="mt-0" />
                        <user-me #me="{ me }">
                            <div class="px-4 py-2 bg-primary rounded-md mx-4 flex flex-row items-center cursor-pointer" @click="isPostBoxOpen = true">
                                <user-avatar :size="32" :user="me" />
                                <span class="text-foregroundSecondary ml-2 font-medium text-sm">Reply...</span>
                            </div>
                        </user-me>
                    <kro-divider />
                    <app-post-feed :parent="source.id" />
                </template>
            </div>

        </kro-surface>
    </app-default-layout>

    <kro-dialog #default="{ close }" class="w-full overflow-auto max-h-full p-0" :padded="false" v-model="isPostBoxOpen">
        <app-post-box @posted="() => close()" :parent="source.id" autofocus></app-post-box>
    </kro-dialog>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useQuery, useResult } from '@black-kro/use-apollo';
    import { GET_POST } from '/~/apollo/query';

    export const isPostBoxOpen = ref(false);

    export const { params: { username, post } } = useRoute();
    export const { loading, error, result } = useQuery(GET_POST, { id: post });
    export const source = useResult(result, null, p => p.post);

    export default {
        name: 'ProfilePost',
    }
</script>

<style lang="scss">
    
</style>