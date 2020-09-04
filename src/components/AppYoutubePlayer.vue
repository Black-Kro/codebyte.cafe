<template>
    <div class="mt-2 pr-4">
        <div class="bg-black relative rounded-md overflow-hidden">
            <app-lazy-image 
                :intrinsicWidth="1280"
                :intrinsicHeight="720"
                :placeholder="`https://i3.ytimg.com/vi/${video}/default.jpg`" 
                :src="`https://i3.ytimg.com/vi/${video}/hqdefault.jpg`" />
            <div @click="shouldLoadVideo = true" class="[ app-youtube-scrim ] absolute inset-0 flex flex-row items-center justify-center cursor-pointer">
                <kro-icon icon="play-circle" class="w-24 h-24" />
            </div>
            <iframe v-if="shouldLoadVideo" class="absolute inset-0 w-full h-full" :src="`https://www.youtube.com/embed/${video}?autoplay=1`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';
    import { useURLParameters } from '/~/composables/';

    export const video = useURLParameters(props.url, 'v');
    export const shouldLoadVideo = ref(false);

    export default {
        name: 'YoutubePlayer',
    }

    declare const props: {
        url: string;
    }
</script>

<style lang="scss">
    
    .app-youtube-scrim {
        color: white;
        background: rgba(0, 0, 0, .48);

        .kro-icon {
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, .48))
        }
    }

</style>