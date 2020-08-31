<template>
    <div class="flex flex-col mt-4">
        <div class="[ flex flex-wrap justify-center gap-2 ] [ text-sm font-medium text-secondary ]">
            <router-link class="text-current" to="/">{{t('footer.About')}}</router-link>
            <router-link class="text-current" to="/">{{t('footer.Help')}}</router-link>
            <a href="https://blog.codebyte.cafe/" rel="noreferrer noopener" target="_blank" class="text-current">{{t('footer.Blog')}}</a>
            <a href="https://discord.gg/TE8MnBe" rel="noreferrer noopener" target="_blank" class="text-current">{{t('footer.Discord')}}</a>
            <router-link class="text-current" to="/terms-of-service">{{t('footer.TermsOfService')}}</router-link>
            <router-link class="text-current" to="/privacy-policy">{{t('footer.PrivacyPolicy')}}</router-link>
        </div>
        <app-logo class="h-8 opacity-50 mt-4" />
    </div>
</template>

<script lang="ts" setup>
    import { useI18n } from 'vue-i18n';

    export const { t } = useI18n();

    export default {
        name: 'TheFooter',
    }
</script>

<style lang="scss">
    
</style>