<template>
    <div class="[ giphy-categroy ] cursor-pointer transform hover:scale-105 transition-transform ease-in-out duration-150 bg-black rounded-md relative overflow-hidden">
        <app-lazy-image
            :src="src"
            :intrinsicWidth="1920"
            :intrinsicHeight="1080" />
        <div class="[ giphy-category__scrim ] absolute inset-0 w-full h-full flex items-center justify-center font-bold text-white">
            {{name}}
        </div>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: '',
        props: {
            name: String,
            src: String,
        }
    }
</script>

<style lang="scss">
    .giphy-categroy {
        text-shadow: 1px 1px 0 black, 1px 2px black;
    }

    .giphy-category__scrim {
        background: rgba(0, 0, 0, .48);
    }
</style>