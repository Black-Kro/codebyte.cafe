<template>
    <div class="[ giphy-categroy ] cursor-pointer transform hover:scale-105 transition-transform ease-in-out duration-150 bg-black rounded-md relative overflow-hidden">
        <app-lazy-image
            :src="gif.images.downsized_still.url"
            :intrinsicWidth="1920"
            :intrinsicHeight="1080" />
        <div class="[ giphy-category__scrim ] absolute inset-0 w-full h-full flex items-center justify-center font-bold text-white">
            <video class="w-full" autoplay :src="gif.images.original_mp4.mp4" loop></video>
        </div>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: '',
        props: {
            gif: Object
        }
    }
</script>

<style lang="scss">
    
</style>