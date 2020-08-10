<template>
    <kro-app>
        <kro-layout
            v-model:is-drawer-hidden="isDrawerHidden"
            v-model:is-drawer-open="isDrawerOpen">
            <template #toolbar>
                <kro-toolbar raised>
                    <div class="flex px-4 flex-row container items-center mx-auto">
                        <kro-button
                            class="mr-4"
                            v-if="isDrawerHidden"
                            @click="isDrawerOpen = !isDrawerOpen" 
                            icon="menu" />

                        <router-link to="/" style="color: var(--kro-foreground);" class="text-xl font-black">
                            Codebyte
                        </router-link>
                        <span class="flex-1"></span>

                        <div class="grid grid-flow-col gap-2 items-center">
                            <kro-button icon="notifications" />
                            <kro-button icon="invert" @click="toggleThemeMode()" />

                            <app-auth-suspense>
                                <template #authenticated>
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
            <!-- <template #drawer v-if="getters['auth/isAuthenticated']">
                <div class="[ app-drawer-container ] [ py-4 h-full flex flex-col items-center gap-4 ]">
                    <router-link to="/" class="flex flex-col items-center text-current">
                        <kro-icon icon="feed" />
                        <span class="text-xs font-medium mt-1">My Feed</span>
                    </router-link>
                    <router-link to="/" class="flex flex-col items-center text-current">
                        <kro-icon icon="explore" />
                        <span class="text-xs font-medium mt-1">Explore</span>
                    </router-link>
                    <router-link to="/" class="flex flex-col items-center text-current">
                        <kro-icon icon="settings" />
                        <span class="text-xs font-medium mt-1">Settings</span>
                    </router-link>

                    <span class="flex-1"></span>
                    <router-link to="/" class="flex flex-col items-center text-current">
                        <kro-avatar class="cursor-pointer w-8 h-8" @click="open" :src="getters['auth/user'].photoURL" />
                        <span class="text-xs font-medium mt-1">Profile</span>
                    </router-link>
                </div>
            </template> -->
            <template #default>
                <router-view></router-view>
            </template>
            <template #footer>
                <footer class="container mx-auto p-4 flex flex-row justify-center">
                    <!-- Footer Content Goes Here -->
                    <span class="text-sm">&copy; {{new Date().getFullYear()}} Codebyte</span>
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