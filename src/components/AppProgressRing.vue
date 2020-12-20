<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle
      fill="transparent"
      stroke="var(--kro-divider)"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset: 0 }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <circle
      fill="transparent"
      stroke="var(--kro-primary)"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
  </svg>
</template>

<script lang="ts" setup="props">
import { computed } from 'vue'

declare const props: {
  radius: number
  progress: number
  stroke: number
  color: string
}

export const normalizedRadius = props.radius - props.stroke * 2
export const circumference = normalizedRadius * 2 * Math.PI

export const strokeDashoffset = computed(() => {
  return circumference - (props.progress / 100) * circumference
})

export default {
  name: 'AppProgressRing',
}

</script>

<style lang="scss">
</style>
