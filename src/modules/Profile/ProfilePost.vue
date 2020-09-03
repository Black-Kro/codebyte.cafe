<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <div v-if="loading" class="pb-4"><app-post-skeleton /></div>
            <div v-else-if="source">
                <app-post :post="source"></app-post>
            </div>
            <kro-divider class="mt-0" />
            <div class="px-4 py-2 bg-primary rounded-md mx-4 flex flex-row items-center cursor-pointer" @click="isPostBoxOpen = true">
                <user-me #me="{ me }">
                    <user-avatar :size="32" :user="me" />
                    <span class="text-secondary ml-2 font-medium text-sm">Reply...</span>
                </user-me>
            </div>
            <kro-divider class="mb-0" />
            <app-post-feed v-if="source" :parent="source.id" />
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