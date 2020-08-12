<template>
    <app-default-layout>
        <kro-surface>

            <account-settings />
            <appearance-settings />
            

            <h2 class="block py-4 font-medium text-lg">Danger Zone</h2>
            <div>
                <kro-list-item>
                    <template #icon><kro-icon icon="error" /></template>
                    Delete Account
                    <template #subtitle>Delete your account and data.</template>
                    <template #action>
                        <kro-button error>Delete Account</kro-button>
                    </template>
                </kro-list-item>
            </div>

        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import AccountSettings from './AccountSettings.vue';
    import AppearanceSettings from './AppearanceSettings.vue';

    export default {
        name: 'SettingsView',
        components: { AccountSettings, AppearanceSettings }
    }
</script>

<style lang="scss">
    
</style>