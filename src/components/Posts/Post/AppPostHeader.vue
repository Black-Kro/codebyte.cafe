<template>
    <user-identity :avatar="false" class="pl-0"  :to="`/@${post.author.username}`" :user="post.author">
        <template #subtitle> · {{format(post.created)}}</template>
        <template #default>
            <div class="flex flex-row items-center h-full">
                <kro-menu :key="post.id" left>
                    <template #activator="{ open }">
                        <kro-button class="w-8 h-8 self-center" @click="open" icon="chevron-down"></kro-button>
                    </template>
                    <div>
                        <kro-list-item
                            v-if="canDeletePost"
                            @click="deletePost" 
                            class="cursor-pointer">
                            <template #icon><kro-icon icon="delete" /></template>
                            {{t('posts.DeletePost')}}
                        </kro-list-item>
                    </div>
                </kro-menu>
            </div>
        </template>
    </user-identity>       
</template>

<script lang="ts" setup="props">
    import { computed } from 'vue';
    import { useMutation, useQuery, useResult } from '@black-kro/use-apollo';
    import { DELETE_POST } from '/~/apollo/mutation';
    import { GET_POSTS, GET_ME } from '/~/apollo/query';
    import { useDialog } from '@black-kro/ui';
    import { useI18n } from 'vue-i18n';
    import { useMe } from '/~/composables';
    import { IPost } from '/~/types';
    export { format } from 'timeago.js';

    const { createConfirmationDialog } = useDialog();
    export const { me } = useMe();

    export const { t, locale } = useI18n();

    export const canDeletePost = computed(() => {
        const post: IPost = props.post;

        if (me.value) {
            const { roles: authorRoles } = post.author;
            const { roles: myRoles } = me.value;

            if (myRoles.indexOf('SuperAdmin') > -1)
                return true;

            if (myRoles.indexOf('Admin') > -1 && authorRoles.indexOf('SuperAdmin') < 0)
                return true;
        }

        return post.isMyPost;
    });

    const { mutate } = useMutation<any, { id: string }>(DELETE_POST, {
        update(cache, { data }) {
            const d = cache.readQuery({
                query: GET_POSTS,
                variables: props.post.parent ? { parent: props.post.parent } : {},
            }) as any;

            d.posts.nodes = d.posts.nodes.filter(post => post.id !== props.post.id);

            cache.writeQuery({
                query: GET_POSTS,
                variables: props.post.parent ? { parent: props.post.parent } : {},
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
                    mutate({ id: props.post.id });
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