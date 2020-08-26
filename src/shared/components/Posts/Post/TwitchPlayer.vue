<template>
    <div class="relative w-full" :style="{ 'padding-top': '56.25%' }">
        <iframe
            :src="`${parameters}&parent=localhost&autoplay=false`"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true">
        </iframe>
    </div>
</template>

<script lang="ts" setup="props">
    import { computed } from 'vue';

    export const parameters = computed(() => {

        if (props.url.indexOf(`twitch.tv/videos`) > -1)
            return `https://player.twitch.tv?video=${props.url.split('twitch.tv/videos/')[1]}`;

        if (props.url.indexOf(`clips.twitch.tv`) > -1)
            return `https://clips.twitch.tv/embed?clip=${props.url.split('clips.twitch.tv/')[1]}`;

        if (props.url.indexOf(`twitch.tv`) > -1)
            return `https://player.twitch.tv/?channel=${props.url.split('twitch.tv/')}`;

        return '';
    });

    export default {
        name: 'AppTwitchPlayer',
    }

    declare const props: {
        url: string;
    }
</script>

<style lang="scss">
    
</style>