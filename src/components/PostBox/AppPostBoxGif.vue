<template>
    <div v-if="$attrs.giphy" class="[ app-post-box__gifs ] p-4">
        <div class="relative">
            <video
                class="w-full rounded-md"
                autoplay 
                loop 
                muted 
                playsinline 
                :src="$attrs.giphy.images.original.mp4"></video>
            <kro-button 
                @click="$emit('update:giphy', null)"
                class="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8" icon="delete" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'AppPostBoxGif',
        props: {
            gif: Object
        }
    }
</script>

<style lang="scss">
    .app-post-box__gifs {
        background: rgba(0, 0, 0, .12);
        border-top: 1px solid var(--kro-divider);
    }
</style>