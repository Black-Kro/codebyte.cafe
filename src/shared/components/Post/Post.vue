<template>
    <div class="app-post">
        <div class="flex flex-row items-center p-4">
            <kro-avatar :src="`${post.author.profile.avatar}?width=48&height=48`" />
            <div class="flex flex-col ml-2">
                <app-nickname :user="post.author" />
                <span class="text-xs text-secondary font-medium">@{{post.author.username}} · {{format(post.created)}}</span>
            </div>
            <span class="flex-1"></span>
            <kro-menu :key="post.postId" left>
                <template #activator="{ open }">
                    <kro-button @click="open" icon="chevron-down"></kro-button>
                </template>
                <div>
                    <kro-list-item @click="postDelete(post.postId)" class="cursor-pointer">
                        <template #icon><kro-icon icon="delete" /></template>
                        Delete Post
                    </kro-list-item>
                </div>
            </kro-menu>
        </div>

        <div class="px-4 py-2">
            <slot />
        </div>

        <div class="[ post__images-container ]" v-if="post.postMedia.length > 0">
            <img @click="openLightbox(image)" v-for="image in post.postMedia" :style="{ height: post.postMedia.length > 1 ? '200px' : 'auto' }" class="block object-cover cursor-pointer" :src="image.path" />
        </div>

        <kro-dialog class="lightbox-container max-w-6xl" v-model="isLightboxOpen">
            <img :src="lightboxPreview" />
        </kro-dialog>

        <div class="[ app-post-controls ] [ p-4 flex flex-row gap-2 ]">
            <kro-button icon="thumb-up-outline"></kro-button>
            <kro-button icon="thumb-down-outline"></kro-button>
            <kro-button icon="reply"></kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    export { format } from 'timeago.js';
    import { useMutation } from '/@app/gql/composable';
    import { deletePost } from '/@app/gql/mutation';
    import { getPosts } from '/@app/gql/query';
    import { useDialog } from '@black-kro/ui';

    /**
     * Lightbox
     */

    export const lightboxPreview = ref(null);
    export const isLightboxOpen = ref();

    export const openLightbox = (image) => {
        lightboxPreview.value = image.path;
        isLightboxOpen.value = true;
        console.log(props);
    }

    
    
    /**
     * Post Deletion
     */

    const { createConfirmationDialog } = useDialog();
    const { mutate } = useMutation<any, { postId: string }>(deletePost, {
        update(cache, { data }) {
            const d = cache.readQuery({
                query: getPosts,
                variables: {},
            }) as any;

            d.posts.nodes = d.posts.nodes.filter(post => post.postId !== props.post.postId);

            cache.writeQuery({
                query: getPosts,
                variables: {},
                data: d
            })
        }
    })

    export const postDelete = async () => {
        try {
            createConfirmationDialog({
                title: 'Delete Post?',
                message: 'Are you sure you want to delete this post?',
                icon: 'error',
                style: 'centered',
                resolveButton: {
                    text: 'Delete',
                    attributes: {
                        error: true,
                    }
                }
            })
                .then(() => {
                    mutate({ postId: props.post.postId });
                })
        } catch {

        }

    };

    export default {
        name: 'AppPost',
        // props: {
        //     user: Object,
        //     post: Object,
        // }
    }

    declare const props: {
        post: any;
        user?: any;
    }

</script>

<style lang="scss">

    .app-post-controls {

        .kro-button {
            width: 2rem;
            height: 2rem;

            --kro-icon-size: 1.25rem;
        }

    }

    .lightbox-container {
        padding: 0 !important;
    }

    .post__images-container {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(50%, 1fr) );
        
        img {
            width: 100%;
        }
    }

</style>