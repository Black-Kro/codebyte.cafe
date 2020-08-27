<template>
    <div ref="self" class="app-post">
        <app-post-header 
            :post="post" />

        <div class="[ post-renderer-content ]">
            <app-post-renderer 
                :content="post.text" />
        </div>

        <app-post-media 
            v-if="post.media && post.media.length > 0"
            :media="post.media" />

        <app-post-footer 
            :post="post" />
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';

    import PostRenderer from './AppPostRenderer';

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


</style>