<template>
    <div class="[ the-search ] [ w-full flex flex-row items-center ] [ bg-primary rounded h-10 ]">
        <kro-icon class="ml-4" icon="search" />
        <input :placeholder="t('common.Search')" type="text" class="flex-1 bg-transparent px-4 outline-none" />
    </div>
</template>

<script lang="ts" setup>
    import { useI18n } from 'vue-i18n';

    export const { t } = useI18n();

    export default {
        name: 'TheSearch',
    }
</script>

<style lang="scss">

</style>