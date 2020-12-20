<template>
  <textarea
    ref="target"
    :placeholder="placeholderValue"
    :value="$attrs.modelValue"
    :autofocus="autofocus"
    class="[] [ block w-full px-4 pb-4 ] [ bg-transparent resize-none outline-none ]"
    @input="onInput"
  />
</template>

<script lang="ts" setup="props, { emit, attrs }">
import { ref, onMounted, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useAxios } from '/~/composables/'

export const placeholder = useStorage(
  'codebyte:post-placeholder',
  '[PAIN NOISE]',
)
export const placeholderValue = placeholder.value
const { get } = useAxios()

get('/api/quotes')
  .then(({ data }) => {
    placeholder.value = data.quote
  })
  .catch(() => {})

export const target = ref<HTMLElement | null>()

export const resize = () => {
  if (target.value) {
    target.value.style.height = 'auto'
    target.value.style.height = `${target.value.scrollHeight}px`
  }
}

export const onInput = (e) => {
  emit('update:modelValue', e.target.value)
  resize()
}

onMounted(() => {
  if (props.autofocus && target.value) target.value.focus()
  resize()
})

watch(
  () => props.isEmpty,
  () => {
    if (props.isEmpty)
      resize()
  },
)

export default {
  name: 'PostTextfield',
  emits: ['update:modelValue'],
}

declare const props: {
  isEmpty: boolean
  autofocus?: boolean
}

declare const emit: any
declare const attrs: any
</script>

<style lang="scss">
</style>
