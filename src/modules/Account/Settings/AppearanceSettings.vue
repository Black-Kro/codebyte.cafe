<template>
    <h2 class="block py-4 font-medium text-lg">Appearance</h2>
    <div>
        <kro-list-item>
            <template #icon><kro-icon icon="theme-light-dark" /></template>
            Theme
            <template #subtitle>Light theme, dark theme, or auto</template>
            <template #action>
                <kro-select class="block w-full" label="Select Theme" v-model="theme">
                    <option value="default-light">Light</option>
                    <option value="default-dark">Dark</option>
                    <option value="default-abyss">Abyss</option>
                </kro-select>
            </template>
        </kro-list-item>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';

    import { useTheme } from '@black-kro/ui';

    export const { theme } = useTheme();


    // export const theme = ref(getThemeMode());


    // watch(() => theme.value, () => {
    //     setThemeMode(theme.value);
    // });

    export default {
        name: 'AppearanceSettings',
    }
</script>

<style lang="scss">
    
</style>