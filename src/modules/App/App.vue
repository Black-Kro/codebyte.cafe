<template>
    <kro-app>
        <kro-layout
            v-model:is-drawer-hidden="isDrawerHidden"
            v-model:is-drawer-open="isDrawerOpen">
            <template #toolbar>
                <kro-toolbar padded>
                    <!-- Toolbar Content Goes Here -->
                    <kro-button
                        class="mr-4"
                        v-if="isDrawerHidden"
                        @click="isDrawerOpen = !isDrawerOpen" 
                        icon="menu" />

                    <router-link to="/" style="color: var(--kro-foreground);" class="text-md font-medium">App Title</router-link>
                    <span class="flex-1"></span>

                    <div class="grid grid-flow-col gap-2 items-center">
                        <kro-button icon="invert" @click="toggleThemeMode()" />

                        <app-auth-suspense>
                            <template #authenticated>
                                <kro-menu>
                                    <template #activator="{ open }">
                                        <kro-avatar class="cursor-pointer" @click="open" :src="getters['auth/user'].photoURL" />
                                    </template>
                                    <template #default>
                                        <div>
                                            <kro-list-item class="cursor-pointer" tabindex="0" @click="dispatch('auth/signOut');">Sign Out</kro-list-item>
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
                </kro-toolbar>
            </template>
            <template #drawer v-if="getters['auth/isAuthenticated']">
                <!-- Drawer Content Goes Here -->
                <div class="py-4">
                    <kro-list-item to="/">
                        <template #icon><kro-icon icon="home"/></template>
                        Home
                    </kro-list-item>
                    <kro-list-item to="/about">
                        <template #icon><kro-icon icon="information"/></template>
                        About
                    </kro-list-item>
                </div>
            </template>
            <template #default>
                <router-view></router-view>
            </template>
            <template #footer>
                <footer class="container mx-auto p-4 flex flex-row justify-center">
                    <!-- Footer Content Goes Here -->
                    <span class="text-sm">&copy; {{new Date().getFullYear()}} Kro App</span>
                </footer>
            </template>
        </kro-layout>
    </kro-app>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useTheme } from '@black-kro/ui';

    export const { toggleThemeMode } = useTheme();
    export const { dispatch, getters } = useStore();

    // Listen for authentication changes
    dispatch('auth/init');

    export const user = getters.user;

    export const isDrawerOpen = ref(false);
    export const isDrawerHidden = ref(false);

    export default {
        name: 'App',
    }
</script>

<style lang="scss">
    
</style>