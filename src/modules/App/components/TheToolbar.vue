<template>
    <kro-toolbar class="[ the-toolbar ]" raised>
        <div class="[] [ container mx-auto px-4 ] [ grid grid-cols-4 lg:grid-cols-9 gap-4 items-center ]">
            <div class="[] [ col-span-2 ] []">
                <router-link to="/" class="[] [] [ text-xl font-black ]">
                    <app-logo class="h-8" />
                    <!-- <img class="[] [ block h-8 ] []" src="/~/shared/assets/Logo.svg" />  -->
                </router-link>
            </div>

            <div class="[] [ col-span-5 hidden lg:flex relative ] []">
                <user-auth-suspense #authenticated>
                    <the-search></the-search>
                </user-auth-suspense>
            </div>

            <div class="[] [ col-span-2 ] [ grid grid-flow-col gap-2 justify-end items-center ]">
                <app-language-selector />
                <kro-menu left>
                    <template #activator="{ open }">
                        <kro-button icon="theme-light-dark" @click="open" />
                    </template>
                    <div>
                        <kro-list-item class="cursor-pointer" @click="setTheme('light');">Light</kro-list-item>
                        <kro-list-item class="cursor-pointer" @click="setTheme('dark')">Dark</kro-list-item>
                        <kro-list-item class="cursor-pointer" @click="setTheme('abyss')">Abyss</kro-list-item>
                    </div>
                </kro-menu>
                <user-auth-suspense>
                    <template #authenticated>
                        <!-- <kro-button icon="notifications" /> -->
                        <the-notifications />
                        <the-menu></the-menu>
                    </template>
                    <template #incomplete>
                        <kro-button @click="dispatch('auth/signOut');">Return to Sign In</kro-button>
                    </template>
                    <template #pending>
                        <kro-squircle class="[] [ w-10 h-10 ] [ text-bg-primary ]" />
                        <div class="[] [ w-12 h-12 ] [ bg-primary rounded-full ]"></div>
                    </template>
                    <template #unauthenticated>
                        <!-- Possible Vue Bug maybe just with Vue Router -->
                        <!-- If this is not wrapped in a div then vue attempts to kill itself. -->
                        <div>
                            <kro-button to="/sign-in">Sign In</kro-button>
                        </div>
                    </template>
                </user-auth-suspense>
            </div>

        </div>
    </kro-toolbar>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { useTheme } from '@black-kro/ui';

    import TheSearch from './TheSearch.vue';
    import TheMenu from './TheMenu.vue';

    export const { getters, dispatch } = useStore();

    export const { theme } = useTheme();

    export const setTheme = (schema) => {
        theme.value = `default-${schema}`;
    };

    export default {
        name: 'TheToolbar',
        components: { TheSearch, TheMenu }
    }
</script>

<style lang="scss">
    
    .the-toolbar {
    }

</style>