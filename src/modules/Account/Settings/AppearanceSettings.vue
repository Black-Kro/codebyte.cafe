<template>
  <h2 class="block py-4 font-medium text-lg">
    Appearance
  </h2>
  <div>
    <kro-list-item>
      <template #icon>
        <kro-icon icon="mdi:theme-light-dark" />
      </template>
      Theme
      <template #subtitle>
        Light theme, dark theme, or auto
      </template>
      <template #action>
        <kro-select v-model="theme" class="block w-full" label="Select Theme">
          <option value="default-light">
            Light
          </option>
          <option value="default-dark">
            Dark
          </option>
          <option value="default-abyss">
            Abyss
          </option>
        </kro-select>
      </template>
    </kro-list-item>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '@black-kro/ui'

export const { theme } = useTheme()

export default {
  name: 'AppearanceSettings',
}
</script>

<style lang="scss">
</style>
