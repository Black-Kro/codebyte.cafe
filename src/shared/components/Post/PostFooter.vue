<template>
    <div class="[ app-post-footer ] [ p-4 grid fit gap-2 ]">
        <kro-button @click="react('LIKE')"><kro-icon icon="thumb-up-outline" />{{post.likes ? post.likes : ''}}</kro-button>
        <kro-button @click="react('DISLIKE')"><kro-icon icon="thumb-down-outline" />{{post.dislikes ? post.dislikes : ''}}</kro-button>
        <kro-button icon="reply"></kro-button>
    </div>
</template>

<script lang="ts" setup="props">
    import { useDialog } from '@black-kro/ui';
    import { useMutation } from '/@app/gql/composable';
    import { REACT_TO_POST } from '/@app/gql/mutation';

    const { mutate: reactMutate } = useMutation<any, { postId: string, type: string }>(REACT_TO_POST);

    export const react = async (type) => {
        reactMutate({ postId: props.post.id, type });
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