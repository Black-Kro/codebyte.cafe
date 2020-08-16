<template>
    <div class="relative">
        <user-me #me="{ me }">
            <user-identity :user="me">
                <kro-button @click="isHelpOpen = true" icon="help" />
            </user-identity>

            <post-box-textfield
                :isEmpty="content.length === 0"
                v-model="content" />

            <post-box-footer
                v-model:files="files"

                @submit="onSubmit"
                :content="content" />

            <post-box-media
                v-model:files="files"
            />
        </user-me>
        <div 
            v-if="isLoading"
            class="[ post-box__loading-overlay ] [ absolute inset-0 w-full h-full ] [ flex flex-col items-center justify-center ]">
            <kro-spinner />
            <span class="mt-4 text-sm font-medium">Creating Post</span>
        </div>
    </div>

    <kro-dialog class="max-w-md w-full" v-model="isHelpOpen">
        <post-box-help />
        <template #footer="{ close }">
            <span class="flex-1"></span>
            <kro-button @click="close">Close</kro-button>
        </template>
    </kro-dialog>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useDialog } from '@black-kro/ui';
    import { useMedia } from '/@app/composables/';
    import { useMutation } from '/@app/gql/composable';
    import { CREATE_POST } from '/@app/gql/mutation';
    import { GET_POSTS } from '/@app/gql/query';

    import PostBoxTextfield from './PostTextfield.vue';
    import PostBoxFooter from './PostBoxFooter.vue';
    import PostBoxMedia from './PostBoxMedia.vue';
    import PostBoxHelp from './PostBoxHelp.vue';

    export const isHelpOpen = ref(false);

    export const content = ref('');
    export const files = ref([]);
    export const isLoading = ref(false);
    export const textfield = ref<any>(null);

    const { uploadMedia } = useMedia();
    const { mutate, loading, error } = useMutation<any, { content: string, media: string[] }>(CREATE_POST, {
        update(cache, { data }) {
            const query = cache.readQuery({ query: GET_POSTS }) as any;
            query.posts.nodes = [data.createPost, ...query.posts.nodes];
            cache.writeQuery({ query: GET_POSTS, variables: {}, data: query });
        }
    });

    export const onSubmit = async () => {
        isLoading.value = true;

        try {
            const media =   await uploadMedia(files.value);
                            await mutate({ content: content.value, media: media });

            // Finish Up
            content.value = '';
            files.value = [];
        } catch (error) {
            
        } finally {
            isLoading.value = false;
        }
    };

    export default {
        name: 'PostBox',
        components: { PostBoxTextfield, PostBoxFooter, PostBoxMedia, PostBoxHelp }
    }
</script>

<style lang="scss">
    
    .post-box {
        &__loading-overlay {
            background: rgba(0, 0, 0, .48);
            backdrop-filter: blur(5px);
        }
    }

</style>