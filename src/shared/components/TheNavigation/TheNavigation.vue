<template>
    <kro-surface :padded="false" class="[ the-navigation ] [ sticky flex flex-col py-2 ]" style="top: calc(var(--kro-toolbar-height, 4rem) + 1rem)">
        <kro-list-item exact to="/">
            <template #icon><kro-icon icon="home" /></template>
            Home
        </kro-list-item>
        <kro-list-item to="/explore">
            <template #icon><kro-icon icon="explore" /></template>
            Explore
        </kro-list-item>
        <kro-list-item to="/notifications">
            <template #icon><kro-icon icon="notifications" /></template>
            Notificatoins
        </kro-list-item>
        <kro-list-item to="/people">
            <template #icon><kro-icon icon="account-multiple" /></template>
            People
        </kro-list-item>
        <kro-divider />
        <kro-list-item to="/@wheat">
            <template #icon><kro-icon icon="account" /></template>
            Profile
        </kro-list-item>
        <kro-list-item to="/settings">
            <template #icon><kro-icon icon="settings" /></template>
            Settings
        </kro-list-item>
    </kro-surface>
</template>

<script lang="ts" setup>
    export default {
        name: 'TheNavigation',
    }
</script>

<style lang="scss">
    
    .the-navigation {
        .router-link-active {
            --kro-list-item-foreground: var(--kro-primary);
            --kro-list-item-icon-color: var(--kro-primary);
        }
    }

</style>