<template>
    <div class="app-post-media">
        <div class="[] [ relative ] [ cursor-pointer ]" v-for="item in media" :key="item.id" @click="openPreview(item)">
            <app-lazy-image
                :style="{ height: media.length > 1 ? '200px' : 'auto' }"
                :placeholder="item.metadata.base64"
                :intrinsicWidth="item.metadata.width"
                :intrinsicHeight="item.metadata.height"
                :src="media.length > 1 ? `${item.url}?size=350` : `${item.url}?size=700`" />
        </div>
    </div>
    <div>
        <kro-dialog class="max-w-6xl app-preview__container" v-model="shouldOpenPreview">
                <app-lazy-image 
                    v-if="preview"
                    class="[ app-preview-image ]"
                    :intrinsicWidth="preview.metadata.width"
                    :intrinsicHeight="preview.metadata.height"
                    :placeholder="preview.metadata.base64" 
                    :src="preview.url" />
        </kro-dialog>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';

    export const preview = ref(null);
    export const shouldOpenPreview = ref(false);

    export const openPreview = (item) => {
        shouldOpenPreview.value = true;
        preview.value = item;
    };

    export default {
        name: 'PostMedia',
    }

    declare const props: {
        media: object[],
    }
</script>

<style lang="scss">

    .app-post-media {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(50%, 1fr) );
    }

    .app-preview-image {
        // width: auto;
        max-height: 80vh;
    }

    .app-preview__container {
        padding: 0 !important;
        overflow: hidden;
    }

</style>