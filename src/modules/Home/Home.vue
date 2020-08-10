<template>
    <div class="container mx-auto p-4 h-full grid grid-cols-6 gap-4">
        <div class="col-span-6 lg:col-span-4">
            <kro-surface>
                Hello World

                <kro-slider v-model="height" />
            </kro-surface>
        </div>
        <div class="col-span-2 hidden lg:block">

        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    export const height = ref(0);

    export default {
        name: 'Home',
    }
</script>

<style lang="scss">
    
</style>