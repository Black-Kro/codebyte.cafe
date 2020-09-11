<template>
    <div>
        <div class="relative" v-for="gif in gifs">
            <app-lazy-image 
                :intrinsicWidth="gif.images.original.width"
                :intrinsicHeight="gif.images.original.height" />
            <video
                class="absolute inset-0 h-full object-cover w-full rounded-md"
                autoplay 
                loop 
                muted 
                playsinline 
                :src="gif.images.original.mp4"></video>
        </div>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: '',
        props: {
            gifs: Array
        }
    }
</script>

<style lang="scss">
    
</style>