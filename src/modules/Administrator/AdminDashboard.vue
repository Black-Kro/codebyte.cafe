<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <kro-list-item>
                <template #icon><kro-icon icon="account" /></template>
                Manage Users
                <template #subtitle>Ban, Unban, and Modify Users</template>
                <template #action>
                    <kro-icon icon="arrow-right" />
                </template>
            </kro-list-item>
            <kro-list-item>
                <template #icon><kro-icon icon="error" /></template>
                Reports
                <template #subtitle>Review user reports</template>
                <template #action>
                    <kro-icon icon="arrow-right" />
                </template>
            </kro-list-item>
            <kro-list-item to="/administrator/invites">
                <template #icon><kro-icon icon="present" /></template>
                Invite Codes
                <template #subtitle>Manage Invite Codes</template>
                <template #action>
                    <kro-icon icon="arrow-right" />
                </template>
            </kro-list-item>

        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    export default {
        name: '',
    }
</script>

<style lang="scss">
    
</style>