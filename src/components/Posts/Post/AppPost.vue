<template>
    <div>
        <div class="app-post flex flex-row" :class="{ 'rounded-md': post.level > 0 }" >
            <div class="pt-3 pl-4 flex flex-col items-center">
                <user-avatar :user="post.author" />
                <div v-if="post.children && post.children.length > 0" class="flex-1 py-1">
                    <div @click="collapseChildren" class="post-trail cursor-pointer"></div>
                </div>
            </div>

            <div class="flex-1">
                <div class="flex-1">
                    <app-post-header
                        :post="post" />

                    <div class="[ post-renderer-content ]" v-if="post.text">
                        <app-post-renderer 
                            :content="post.text" />
                    </div>

                    <div
                        v-if="post.media && post.media.length > 0"
                        class="ml-2 mt-4 rounded-md overflow-hidden mr-6">
                        <app-post-media
                            
                            :media="post.media" />
                    </div>

                    <app-post-footer 
                        :post="post" />
                </div>
                <div v-show="!hide" class="-ml-4">
                    <app-post v-for="child in post.children" :key="child.id" :post="child" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';

    import PostRenderer from './AppPostRenderer';

    export const hide = ref(false);

    export const collapseChildren = () => {
        hide.value = !hide.value;
    };

    export default {
        name: 'AppPost',
        components: {
            PostRenderer,
        }
    }

    declare const props: {
        post: any;
    }

</script>

<style lang="scss">

    

    .lightbox-container {
        padding: 0 !important;

        img {
            height: 100%;
        }
    }

    .app-lightbox-placeholder  {
        max-height: 50vh;
        max-width: 100vw;
        overflow: hidden;

        &::before {
            content: '';
            width: 1px;
            display: block;
            position: relative;
            padding-top: var(--aspect-ratio);
        }
    }

    .post-trail {
        height: 100%;
        border-left: 4px dotted var(--kro-background);
    }

</style>