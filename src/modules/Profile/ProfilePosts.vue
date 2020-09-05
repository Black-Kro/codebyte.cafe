<template>
    <div>
        <app-post-feed :username="username.substring(1)"></app-post-feed>
    </div>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';

    export const { params: { username } } = useRoute();

    export default {
        name: '',
    }
</script>

<style lang="scss">
    
</style>