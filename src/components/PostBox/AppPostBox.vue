<template>
    <div v-bind="$attrs" class="relative">
        <user-me #default="{ me, loading }">
            <user-identity :user="me" :skeleton="loading">
                <kro-button @click="isHelpOpen = true" icon="help" />
            </user-identity>
        </user-me>
            <app-post-box-textfield
                :autofocus="autofocus"
                :isEmpty="content.length === 0"
                v-model="content" />

            <app-post-box-footer
                v-model:files="files"
                v-model:giphy="gif"
                :media="files"
                @submit="onSubmit"
                :content="content" />

            <app-post-box-media
                v-model:files="files" />
            
            <app-post-box-gif
                v-model:giphy="gif" />
        <div 
            v-if="isLoading"
            class="[ post-box__loading-overlay ] [ absolute inset-0 w-full h-full ] [ flex flex-col items-center justify-center ]">
            <kro-spinner />
            <span class="mt-4 text-sm font-medium">Creating Post</span>
        </div>
    </div>

    <kro-dialog class="max-w-md w-full" v-model="isHelpOpen">
        <app-post-box-help />
        <template #footer="{ close }">
            <span class="flex-1"></span>
            <kro-button @click="close">Close</kro-button>
        </template>
    </kro-dialog>
</template>

<script lang="ts" setup="props, { emit }">
    import { ref, onMounted } from 'vue';
    import { useDialog } from '@black-kro/ui';
    import { useMedia } from '/~/composables';
    import { useMutation } from '@black-kro/use-apollo';
    import { CREATE_POST } from '/~/apollo/mutation';
    import { GET_POSTS } from '/~/apollo/query';

    export const isHelpOpen = ref(false);

    export const content = ref(props.initialText || '');
    export const files = ref([]);
    export const gif = ref<any>(null);
    export const isLoading = ref(false);
    export const textfield = ref<any>(null);

    const { uploadMedia } = useMedia();
    const { mutate, loading, error } = useMutation<any, { content: string, media: string[], giphy: string[], parent?: string }>(CREATE_POST, {
        update(cache, { data }) {
            try {
                const query = cache.readQuery({ query: GET_POSTS, variables: { parent: props.parent } }) as any;
                
                if (query.posts.nodes.filter(p => p.id === data.createPost.id).length === 0) {
                    const nodes = [data.createPost, ...query.posts.nodes];
                    cache.writeQuery({ query: GET_POSTS, variables: { parent: props.parent }, data: {
                        ...query,
                        posts: {
                            ...query.posts,
                            nodes
                        }
                    } });
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    export const onSubmit = async () => {
        isLoading.value = true;

        try {
            const media =   await uploadMedia(files.value);
                            await mutate({ content: content.value, media: media, giphy: [gif.value && (gif.value as any).id].filter(x => x), parent: props.parent });

            // Finish Up
            content.value = '';
            files.value = [];
            gif.value = null;
            emit('posted')
        } catch (error) {
            
        } finally {
            isLoading.value = false;
        }
    };

    export default {
        name: 'AppPostBox',
        emits: ['posted']
    }

    declare const props: {
        autofocus?: boolean;
        parent?: string;
        initialText?: string;
    }

    declare const emit: any;
</script>

<style lang="scss">
    
    .post-box {
        &__loading-overlay {
            background: rgba(0, 0, 0, .48);
            backdrop-filter: blur(5px);
        }
    }

</style>