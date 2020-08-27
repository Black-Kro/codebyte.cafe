<template>
    <user-me>
        <template #me="{ me }">
            <kro-menu left>
                <template #activator="{ open }">
                    <user-avatar
                        @click="open" 
                        class="cursor-pointer" 
                        :user="me" />
                </template>
                <div class="[] [ pb-2 w-64 ] []">
                    <user-identity :user="me"></user-identity>
                    <kro-divider class="m-0" />
                    <kro-list-item class="cursor-pointer" :to="`/@${me.username}`">
                        <template #icon><kro-icon icon="account"/></template>
                        {{t('menu.Profile')}}
                    </kro-list-item>
                    <kro-list-item class="cursor-pointer" to="/settings">
                        <template #icon><kro-icon icon="settings"/></template>
                        {{t('menu.Settings')}}
                    </kro-list-item>
                    <kro-divider class="my-2"/>
                    <kro-list-item class="cursor-pointer" to="/help">
                        <template #icon><kro-icon icon="help"/></template>
                        {{t('menu.HelpFeedback')}}
                    </kro-list-item>
                    <kro-list-item class="cursor-pointer" tabindex="0" @click="dispatch('auth/signOut');">
                        <template #icon><kro-icon icon="exit-to-app"/></template>
                        {{t('menu.SignOut')}}
                    </kro-list-item>
                </div>
            </kro-menu>
        </template>

        <template #loading>
            <div class="[] [ w-12 h-12 ] [ bg-primary rounded-full ]"></div>
        </template>
    </user-me>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { useI18n } from 'vue-i18n';

    export const { t } = useI18n();

    export const { dispatch, getters } = useStore();

    export default {
        name: 'TheMenu',
    }
</script>

<style lang="scss">
    
</style>