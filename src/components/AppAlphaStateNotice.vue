<template>
    <kro-surface>
        <span class="font-bold text-sm text-center text-secondary block">{{t('common.Notice')}}</span>
        <p class="text-xs text-center text-secondary font-medium" >{{t('statements.AlphaNotice')}}</p>
    </kro-surface>
</template>

<script lang="ts" setup>
    import { useI18n } from 'vue-i18n';

    export const { t } = useI18n();

    export default {
        name: 'AppAlphaStateNotice',
    }
</script>

<style lang="scss">
    
</style>