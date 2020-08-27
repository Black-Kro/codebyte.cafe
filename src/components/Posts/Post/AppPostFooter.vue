<template>
    <div class="[ app-post-footer ] [ p-4 grid fit gap-2 ]">
        <kro-button 
            class="w-8 h-8"
            icon="thumb-up-outline" />
        <kro-button
            class="w-8 h-8"
            icon="thumb-down-outline" />
        <kro-button 
            class="w-8 h-8"
            icon="reply" />
    </div>
</template>

<script lang="ts" setup="props">
    import { useDialog } from '@black-kro/ui';
    import { useMutation } from '/~/gql/composable';
    import { REACT_TO_POST } from '/~/gql/mutation';

    const { mutate: reactMutate } = useMutation<any, { postId: string, type: string }>(REACT_TO_POST);

    export const react = async (type) => {
        let newLikes = props.post.likes;
        let newDislikes = props.post.dislikes;

        if (type === 'REMOVE') {
            if (props.post.liked)
                newLikes--;

            if (props.post.disliked) 
                newDislikes--;
        }

        if (type === 'LIKE') {
            newLikes++;

            if (props.post.disliked) 
                newDislikes--;
        }

        if (type === 'DISLIKE') {
            if (props.post.liked)
                newLikes--;

            newDislikes++;
        }

        reactMutate({ postId: props.post.id, type }, {
            optimisticResponse: {
                reactToPost: {
                    id: props.post.id,
                    likes: newLikes,
                    dislikes: newDislikes,
                    liked: type === 'LIKE',
                    disliked: type === 'DISLIKE',
                    "__typename": "Post"
                }
            }
        });
    };

    export default {
        name: 'PostFooter',
    }

    declare const props: {
        post: any;
    }

</script>

<style lang="scss">
    
    .app-post-footer {
        grid-template-columns: repeat(auto-fit, minmax(0, min-content));

        .kro-button {
            --kro-icon-size: 1.25rem;
        }
    }

</style>