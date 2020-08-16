<template>
    <user-identity :to="`/@${post.author.username}`" :user="post.author">
        <template #subtitle> · {{format(post.created)}}</template>
        <template #default>
            <kro-menu :key="post.id" left>
                <template #activator="{ open }">
                    <kro-button @click="open" icon="chevron-down"></kro-button>
                </template>
                <div>
                    <kro-list-item @click="deletePost" class="cursor-pointer">
                        <template #icon><kro-icon icon="delete" /></template>
                        Delete Post
                    </kro-list-item>
                </div>
            </kro-menu>
        </template>
    </user-identity>       
</template>

<script lang="ts" setup="props">
    import { useMutation } from '/@app/gql/composable';
    import { DELETE_POST } from '/@app/gql/mutation';
    import { GET_POSTS } from '/@app/gql/query';
    import { useDialog } from '@black-kro/ui';

    export { format } from 'timeago.js';

    const { createConfirmationDialog } = useDialog();

    const { mutate } = useMutation<any, { postId: string }>(DELETE_POST, {
        update(cache, { data }) {
            const d = cache.readQuery({
                query: GET_POSTS,
                variables: {},
            }) as any;

            d.posts.nodes = d.posts.nodes.filter(post => post.id !== props.post.id);

            cache.writeQuery({
                query: GET_POSTS,
                variables: {},
                data: d
            })
        }
    })

    export const deletePost = async () => {
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
                    mutate({ postId: props.post.id });
                })
        } catch {
            
        }

    };

    export default {
        name: 'PostHeader',
    }

    declare const props: {
        post: any;
    }
</script>

<style lang="scss">
    
</style>