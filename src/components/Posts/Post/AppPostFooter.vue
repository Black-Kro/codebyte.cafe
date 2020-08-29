<template>
    <div class="[ app-post-footer ] [ py-4 grid fit gap-1 ]">
        <kro-button class="h-8 bg-transparent text-secondary">
            <kro-icon icon="arrow-up-thick"/>
        </kro-button>
        <kro-button class="h-8 bg-transparent text-secondary">
            <kro-icon icon="arrow-down-thick" />
        </kro-button>
        <kro-button :to="`/@${post.author.username}/${post.id}`" class="h-8 bg-transparent text-secondary">
            <kro-icon icon="posts" />
            {{post.childCount > 0 ? post.childCount : ''}}
        </kro-button>
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