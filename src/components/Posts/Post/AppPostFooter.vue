<template>
    <div class="[ app-post-footer ] [ py-4 -ml-2 grid fit ]">
        <kro-button :class="{ 'reaction-active': post.liked }" :key="post.likes" @click="react('LIKE')" class="h-8 bg-transparent text-secondary">
            <kro-icon icon="arrow-up-thick"/>
            <span>
                {{post.likes}}
            </span>
        </kro-button>
        <kro-button :class="{ 'reaction-active': post.disliked }" :key="post.dislikes" @click="react('DISLIKE')" class="h-8 bg-transparent text-secondary">
            <kro-icon icon="arrow-down-thick" />
            <span>
                {{post.dislikes}}
            </span>
        </kro-button>
        <kro-button v-if="post.level === 1" @click="isPostBoxOpen = true" class="h-8 bg-transparent text-secondary">
            <kro-icon icon="posts" />
            {{post.childCount > 0 ? post.childCount : ''}}
        </kro-button>
        <kro-button v-else-if="post.level !== 2" :to="`/@${post.author.username}/${post.id}`" class="h-8 bg-transparent text-secondary">
            <kro-icon icon="posts" />
            {{post.childCount > 0 ? post.childCount : ''}}
        </kro-button>
    </div>
    <kro-dialog #default="{ close }" class="w-full overflow-auto max-h-full p-0" :padded="false" v-model="isPostBoxOpen">
        <app-post-box @posted="() => close()" :parent="post.id" autofocus></app-post-box>
    </kro-dialog>
</template>

<script lang="ts" setup="props">
    import { computed, ref } from 'vue';
    import { useDialog } from '@black-kro/ui';
    import { useMutation } from '/~/gql/composable';
    import { REACT_TO_POST } from '/~/gql/mutation';

    export const isPostBoxOpen = ref(false);
    const { mutate } = useMutation<any, { id: string, reaction: string }>(REACT_TO_POST);

    export const totalLikes = computed(() => {
        return props.post.likes;
    });

    export const totalDislikes = computed(() => {
        return props.post.dislikes;
    });

    export const react = async (type) => {
        const { post } = props;
        
        let likes = post.likes;
        let dislikes = post.dislikes;

        if (post.liked) {
            likes--;

            if (type === 'DISLIKE')
                dislikes++;

        } else if (post.disliked) {
            dislikes--;

            if (type === 'LIKE')
                likes++;
        } else {
            if (type === 'LIKE')
                likes++;

            if (type === 'DISLIKE')
                dislikes++;
        }


        mutate({ id: post.id, reaction: type }, {
            optimisticResponse: {
                react: {
                    ...post,
                    likes,
                    dislikes,
                    liked: (type === 'LIKE' && !post.liked) ? true : false,
                    disliked: (type === 'DISLIKE' && !post.disliked) ? true : false,
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
        grid-template-columns: repeat(auto-fit, minmax(75px, min-content));

        .kro-button {
            --kro-icon-size: 1.25rem;

            place-content: unset;
            align-content: center;
            place-items: unset;

            .kro-button__content {
                justify-content: flex-start;
                place-items: unset;
            }

        }
    }

    .reaction-active {
        color: var(--kro-primary) !important;
    }

</style>