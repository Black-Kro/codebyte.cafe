import { useMutation, useQuery, useResult } from '@black-kro/use-apollo';
import { GET_POSTS } from '/~/apollo/query';
import { DELETE_POST } from '/~/apollo/mutation';
import { useToast, useMe } from '/~/composables';
import { IPost } from '/~/types';
import { computed } from 'vue';

export const usePost = (post: IPost) => {

    const { createToast } = useToast();
    const { me } = useMe();

    const canDeletePost = computed(() => {
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

    const { mutate: deletePostMutation } = useMutation<any, { id: string }>(DELETE_POST, {
        update(cache, { data }) {
            const oldQuery = cache.readQuery({
                query: GET_POSTS,
                variables: post.parent ? { parent: post.parent.id } : {},
            }) as any;

            const posts = {
                ...oldQuery,
                posts: {
                    ...oldQuery.posts,
                    nodes: oldQuery.posts.nodes.filter(p => p.id !== post.id)
                }
            };

            cache.writeQuery({
                query: GET_POSTS,
                variables: post.parent ? { parent: post.parent.id } : {},
                data: posts
            })
        }
    });

    const deletePost = async () => {
        try {
            await deletePostMutation({ id: post.id });
            createToast({
                title: 'Post Deleted',
                message: 'Post Successfully Deleted!',
                icon: 'success',
                duration: 5,
            })
        } catch (error) {
            console.error(error);

            createToast({
                title: 'Failed to delete post.',
                message: 'There was an error deleting this post.',
                icon: 'error',
                duration: 5
            });
        }
    }

    return {
        deletePost,
        canDeletePost,
    }

}