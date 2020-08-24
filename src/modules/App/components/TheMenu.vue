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
                    <kro-divider class="my-2" />
                    <kro-list-item class="cursor-pointer" :to="`/@${me.username}`">
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
            </kro-menu>
        </template>

        <template #loading>
            <div class="[] [ w-12 h-12 ] [ bg-primary rounded-full ]"></div>
        </template>
    </user-me>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex';

    export const { dispatch, getters } = useStore();

    export default {
        name: 'TheMenu',
    }
</script>

<style lang="scss">
    
</style>