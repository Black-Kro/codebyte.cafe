<template>
    <div ref="self" class="app-post">
        <post-header 
            :post="post" />

        <div class="[ post-renderer-content ]">
            <post-renderer 
                :content="post.text" />
        </div>

        <post-media 
            v-if="post.media && post.media.length > 0"
            :media="post.postMedia" />

        <post-footer 
            :post="post" />
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';

    import PostRenderer from './PostRenderer';
    import PostHeader from './PostHeader.vue';
    import PostMedia from './PostMedia.vue';
    import PostFooter from './PostFooter.vue';

    export default {
        name: 'AppPost',
        components: {
            PostRenderer,
            PostMedia,
            PostFooter,
            PostHeader,
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


</style>