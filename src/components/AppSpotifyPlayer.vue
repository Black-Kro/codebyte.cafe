<template>
    <div class="mt-2 pr-4">
        <div class="relative" :class="`app-spotify-player__${type}`">
            <div class="absolute inset-0 w-full h-full">
                <iframe :src="`https://open.spotify.com/embed/${id}`" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';
    import { parseSpotifyURL } from '/~/util/parsers';

    export const { id, type } = parseSpotifyURL(props.url);

    export default {
        name: 'SpotifyPlayer',
    }

    declare const props: {
        url: string;
    }
</script>

<style lang="scss">

    .app-spotify-player__show, 
    .app-spotify-player__episode {
        height: 152px;
    }

    .app-spotify-player__track {
        height: 80px;
    }

    .app-spotify-player__album,
    .app-spotify-player__playlist {
        height: 380px;
    }

</style>