<template>
    <kro-app>
        <kro-layout
            v-model:is-drawer-hidden="isDrawerHidden"
            v-model:is-drawer-open="isDrawerOpen">
            <template #toolbar>
                <kro-toolbar raised>
                    <div class="[ container mx-auto px-4 ] [ grid grid-cols-4 md:grid-cols-9 gap-4 items-center ]">
                        <div class="col-span-2">
                            <router-link to="/" style="color: var(--kro-foreground);" class="text-xl font-black">
                                <img class="block h-8" src="/@app/shared/assets/Logo.svg" /> 
                            </router-link>
                        </div>
                        
                        <div class="col-span-5 hidden md:flex">
                            <app-auth-suspense>
                                <template #authenticated>
                                    <the-search></the-search>
                                </template>
                            </app-auth-suspense>
                        </div>

                        <div class="grid grid-flow-col gap-2 items-center justify-end col-span-2">
                            <kro-button icon="invert" @click="toggleThemeMode()" />

                            <app-auth-suspense>
                                <template #authenticated>

                                    <kro-menu left>
                                        <template #activator="{ open }">
                                            <kro-button @click="open" icon="notifications" />
                                        </template>
                                        <template #default>
                                            <div class="py-4 w-64">
                                                Some Menu Content
                                            </div>
                                        </template>
                                    </kro-menu>

                                    <kro-menu left>
                                        <template #activator="{ open }">
                                            <kro-avatar class="cursor-pointer" @click="open" :src="getters['auth/user'].photoURL" />
                                        </template>
                                        <template #default>
                                            <div class="py-2 w-64">
                                                <div class="px-4 py-1 flex flex-row items-center">
                                                    <kro-avatar :src="getters['auth/user'].photoURL" />
                                                    <div class="flex flex-col ml-4 min-w-0">
                                                        <span class="truncate">{{getters['auth/user'].displayName}}</span>
                                                        <span class="truncate text-xs">{{getters['auth/user'].email}}</span>
                                                    </div>
                                                </div>
                                                <kro-divider class="my-2" />
                                                <kro-list-item class="cursor-pointer" :to="`/profile`">
                                                    <template #icon><kro-icon icon="account"/></template>
                                                    View Profile
                                                </kro-list-item>
                                                <kro-list-item class="cursor-pointer" to="/settings">
                                                    <template #icon><kro-icon icon="settings"/></template>
                                                    Settings
                                                </kro-list-item>
                                                <kro-divider class="my-2"/>
                                                <kro-list-item class="cursor-pointer" to="/help">
                                                    <template #icon><kro-icon icon="help"/></template>
                                                    Help & Feedback
                                                </kro-list-item>
                                                <kro-list-item class="cursor-pointer" tabindex="0" @click="dispatch('auth/signOut');">
                                                    <template #icon><kro-icon icon="exit-to-app"/></template>
                                                    Sign Out
                                                </kro-list-item>
                                            </div>
                                        </template>
                                    </kro-menu>
                                </template>
                                <template #unauthenticated>
                                    <kro-button to="/sign-in">Sign In</kro-button>
                                    <kro-button to="/sign-up">Sign Up</kro-button>
                                </template>
                            </app-auth-suspense>
                        </div>
                    </div>
                </kro-toolbar>
            </template>
            <template #default>
                <router-view></router-view>
                <kro-button @click="elevate" class="[ return-to-top ] [ rounded-full w-12 h-12 fixed ]">
                    <kro-icon icon="arrow-up-thick" />
                </kro-button>
            </template>
            <template #footer>
                <footer class="container mx-auto p-4 flex flex-row justify-center">
                    <div class="flex flex-col justify-center items-center content-center">
                        <img class="block h-8 opacity-75" src="/@app/shared/assets/Logo.svg" />
                        <div class="py-2 text-sm">
                            <router-link class="text-current" to="/">About</router-link>
                            <span class="mx-2">·</span>
                            <router-link class="text-current" to="/">Help</router-link>
                            <span class="mx-2">·</span>
                            <router-link class="text-current" to="/">Blog</router-link>
                            <span class="mx-2">·</span>
                            <router-link class="text-current" to="/terms-of-service">Terms of Service</router-link>
                            <span class="mx-2">·</span>
                            <router-link class="text-current" to="/privacy-policy">Privacy Policy</router-link>
                        </div>
                        <span class="text-xs font-medium">&copy; {{new Date().getFullYear()}} Codebyte</span>
                    </div>
                </footer>
            </template>
        </kro-layout>
    </kro-app>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useTheme } from '@black-kro/ui';
    import { TheSearch } from './components';
    import { useElevator } from '/@app/composables/useElevator';

    export const { toggleThemeMode } = useTheme();
    export const { dispatch, getters } = useStore();

    export const { elevate } = useElevator();

    // Listen for authentication changes
    dispatch('auth/init');

    export const user = getters.user;

    export const isDrawerOpen = ref(false);
    export const isDrawerHidden = ref(false);

    export default {
        name: 'App',
        components: { TheSearch }
    }
</script>

<style lang="scss">

    .return-to-top {
        bottom: 1rem;
        right: 1rem;
        border: 1px solid var(--kro-divider);
    }

</style>