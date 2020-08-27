<template>
    <div ref="self" class="[ app-lazy-image ] [ relative overflow-hidden ]">
        <img v-bind="$attrs" v-if="intrinsicSizeURL" :src="intrinsicSizeURL" />
        <transition name="fade">
            <img 
                v-if="!shouldLoad && placeholder"
                class="[ app-lazy-image__placeholder ] [ w-full h-full absolute inset-0 ] [ object-cover ]" 
                :src="placeholder">
        </transition>
        <transition entry name="fade">
            <img v-if="shouldLoad" class="[ app-lazy-image__source ] [ w-full h-full absolute inset-0 ] [ object-cover ]" :src="src">
        </transition>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';
    import { useIntersection } from '/~/composables/';

    export const self = ref(null);
    export const { onIntersected } = useIntersection(self);

    export const intrinsicSizeURL = ref<any>(null);
    export const shouldLoad = ref(false);

    if (props.intrinsicWidth && props.intrinsicHeight) {
        const c = document.createElement('canvas');
        c.width = props.intrinsicWidth;
        c.height = props.intrinsicHeight;
        
        intrinsicSizeURL.value = c.toDataURL();
    }

    onIntersected(() => {
        const img = new Image();
        img.onload = () => {
            shouldLoad.value = true;
        };
        img.src = props.src;        
    });

    export default {
        name: 'AppLazyImage',
        inheritAttrs: false
    }

    declare const props: {
        intrinsicWidth?: number;
        intrinsicHeight?: number;
        placeholder: string;
        src: string;
    }
</script>

<style lang="scss">
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .kro-dialog__container {
        grid-template-columns: 1fr;
    }

</style>