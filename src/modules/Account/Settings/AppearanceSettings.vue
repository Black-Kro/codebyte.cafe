<template>
    <h2 class="block py-4 font-medium text-lg">Appearance</h2>
    <div>
        <kro-list-item>
            <template #icon><kro-icon icon="theme-light-dark" /></template>
            Theme
            <template #subtitle>Light theme, dark theme, or auto</template>
            <template #action>
                <kro-select class="block w-full" label="Select Theme" v-model="theme">
                    <option value="unset">Auto</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </kro-select>
            </template>
        </kro-list-item>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';

    import { useTheme } from '@black-kro/ui';

    export const { getThemeMode, setThemeMode } = useTheme();
    export const theme = ref(getThemeMode());


    watch(() => theme.value, () => {
        setThemeMode(theme.value);
    });

    export default {
        name: 'AppearanceSettings',
    }
</script>

<style lang="scss">
    
</style>