<template>
  <div>
    <kro-dialog v-model="isDialogOpen" class="w-full max-w-sm">
      <template #activator="{ open }">
        <kro-button icon="mdi:poll" @click="open" />
      </template>
      <template #default>
        <span
          class="block text-sm font-bold text-foregroundSecondary pb-4"
        >Poll Options</span>
        <div class="grid gap-4">
          <div v-for="option in options" :key="option">
            <div class="flex flex-row items-center">
              <kro-textfield
                v-model="values[option - 1]"
                class="flex-1"
                :label="`Option ${option}`"
              />
            </div>
          </div>
          <kro-button
            v-if="options < 5"
            @click="options = Math.min(5, options + 1)"
          >
            Add Option
          </kro-button>
        </div>
        <div>
          <span
            class="block text-sm font-bold text-foregroundSecondary py-4"
          >Poll Duration</span>
          <div class="grid grid-flow-col gap-4">
            <kro-select v-model="days" label="Days">
              <option v-for="i in 7" :key="i">
                {{ i }}
              </option>
            </kro-select>
            <kro-select v-model="hours" label="Hours">
              <option v-for="i in 23" :key="i">
                {{ i }}
              </option>
            </kro-select>
            <kro-select v-model="minutes" label="Minutes">
              <option v-for="i in 59" :key="i">
                {{ i }}
              </option>
            </kro-select>
          </div>
        </div>
      </template>
      <template #footer>
        <span class="flex-1" />
        <kro-button>Cancel</kro-button>
        <kro-button primary>
          Create
        </kro-button>
      </template>
    </kro-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

export const isDialogOpen = ref(false)
export const options = ref(2)
export const values = ref([])

export const days = ref()
export const hours = ref()
export const minutes = ref()

// TODO Export Stuff to create poll

export default {
  name: '',
}
</script>

<style lang="scss">
</style>
