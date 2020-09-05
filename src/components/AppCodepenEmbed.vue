<template>
    <div class="mr-4 mt-2 relative">
        <app-lazy-image :intrinsicWidth="1920" :intrinsicHeight="1080" />
        <div class="absolute top-0 h-full w-full rounded-md overflow-hidden" >
            <div 
                :data-user="user"
                :data-slug-hash="pen"
                data-height="100%"
                :id="pen"
                @click="loadPen">
                <app-lazy-image
                    :src="`${url}/image/small.png`"
                    :intrinsicWidth="1920"
                    :intrinsicHeight="1080" />
                <div class="[ codepen-scrim ] absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <div class="[ codepen-run ] px-4 text-sm font-medium h-10 rounded-sm flex items-center justify-center mb-2">
                        <kro-icon icon="codepen" class="mr-2" />
                        Run Pen
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';

    export const isPenLoaded = ref(false);

    export const user = props.url.split('.io')[1].split('/')[1];
    export const pen = props.url.split('/pen/')[1];

    export const loadPen = () => {
        window.__CPEmbed(`#${pen}`)
    }

    export default {
        name: 'AppCodepenEmbed',
    }

    declare const window: any;

    declare const props: {
        url: string;
    }
</script>

<style lang="scss">
    .codepen-scrim {
        background: rgba(0, 0, 0, .72);
        backdrop-filter: blur(3px);
    }

    .codepen-run {
        border: 2px solid white;
        color: white;
    }

    .cp_embed_wrapper {
        height: 100%;
    }
</style>