<template>
    <div ref="self">
        <slot />
    </div>
</template>

<script lang="ts" setup="props, { emit }">
    import { ref } from 'vue';
    import { useIntersection } from '/~/composables';

    export const self = ref(null);
    const { onIntersected } = useIntersection(self,)

    onIntersected(() => {
        emit('intersected')
    });

    export default {
        name: 'AppSelfIntersection',
        emits: ['intersected']
    }

    declare const emit;

</script>

<style lang="scss">
    
</style>