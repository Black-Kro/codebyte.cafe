<template>
  <kro-dialog v-model="isOpen" class="[ app-language-dialog ] w-64 p-0">
    <template #activator="{ open }">
      <kro-button icon="mdi:translate" @click="open" />
    </template>
    <template #default="{ close }">
      <span
        class="text-foregroundSecondary block mb-2 px-4 font-medium"
      >Select Language</span>

      <div
        v-for="(local, key) in locales"
        :key="key"
        class="[ language-option ] px-4 py-2 cursor-pointer"
        @click="
          () => {
            selectLanguage(key);
            close();
          }
        "
      >
        {{ local }}
      </div>
    </template>
  </kro-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
export { locales } from '/~/messages'

const { locale } = useI18n()

export const isOpen = ref(false)

export const selectLanguage = (k) => {
  locale.value = k
}

export default {
  name: 'AppLanguageSelector',
}
</script>

<style lang="scss">
.app-language-dialog {
  padding: 1rem 0 !important;
}

.language-option {
  &:hover {
    background: var(--kro-background-highlight);
  }
}
</style>
