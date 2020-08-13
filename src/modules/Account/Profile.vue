<template>
    <app-default-layout>
        <kro-surface>
            <h2 class="text-xl font-medium">Profile</h2>
            <div class="text-center p-4 text-sm font-bold">
                <span>Coming Soon</span>
                {{params}}
            </div>
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';

    export const { params } = useRoute();

    export default {
        name: 'ProfileView',
    }
</script>

<style lang="scss">
    
</style>