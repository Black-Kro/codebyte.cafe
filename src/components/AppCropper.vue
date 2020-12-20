<template>
  <div>
    <div class="app-cropper-container">
      <img ref="target" class="block" :src="source">
    </div>
    <div class="flex flex-row flex-1 gap-4 pt-4">
      <span class="flex-1" />
      <kro-button @click="cancel">
        {{ $t("common.Cancel") }}
      </kro-button>
      <kro-button primary @click="crop">
        {{ $t("common.Crop") }}
      </kro-button>
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { ref, onMounted } from 'vue'
import Cropper from 'cropperjs'

declare const props: {
  src: any
  handle: any
  options: object
  croppedOptions: any
}

export const source = URL.createObjectURL(props.src)

let cropper: Cropper
export const target = ref<HTMLImageElement | null>(null)

export const cancel = () => {
  props.handle.reject()
}

export const crop = () => {
  cropper.getCroppedCanvas(props.croppedOptions).toBlob((blob) => {
    if (blob) props.handle.resolve(blob)
    else props.handle.reject('Failed to crop')
  }, props.src.type)
}

onMounted(() => {
  if (target.value) cropper = new Cropper(target.value, props.options)
})

export default {
  name: 'AppCropper',
}

</script>

<style lang="scss">
.app-cropper-container {
  max-height: 80vh;
}
</style>
