<template>
    <kro-app class="pb-16 lg:pb-0">
        <kro-layout>
            <template #toolbar>
                <the-toolbar></the-toolbar>
            </template>
            <template #default>
                <router-view></router-view>
                <kro-button @click="elevate" class="[ return-to-top ] [ rounded-full w-12 h-12 fixed ]">
                    <kro-icon icon="arrow-up-thick" />
                </kro-button>
            </template>
            <template #footer>
                <the-footer></the-footer>
            </template>
        </kro-layout>
    </kro-app>
</template>

<script lang="ts" setup>
    import { TheToolbar, TheFooter } from './components';

    import { useStore } from 'vuex';
    import { useTheme } from '@black-kro/ui';
    import { useElevator } from '/@app/composables/useElevator';

    export const { toggleThemeMode } = useTheme();
    export const { dispatch, getters } = useStore();

    export const { elevate } = useElevator();

    // Listen for authentication changes
    dispatch('auth/init');

    export const user = getters.user;

    export default {
        name: 'App',
        components: { TheToolbar, TheFooter }
    }
</script>

<style lang="scss">

    .return-to-top {
        bottom: 1rem;
        right: 1rem;
        border: 1px solid var(--kro-divider);
    }

</style>