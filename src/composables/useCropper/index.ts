import Cropper from 'cropperjs'
import { ref } from 'vue'

export const cropperInstances = ref<any>([])

const createCropperInstance = (src, options, croppedOptions, resolve, reject) => {
  const instance = {
    isOpen: ref(true),
    options,
    croppedOptions,
    resolve,
    reject,
    src,
    destroy() {
      cropperInstances.value.splice(cropperInstances.value.indexOf(this), 1)
    },
  }

  cropperInstances.value = [
    ...cropperInstances.value,
    instance,
  ]
}

const defaultCropperOptions = {
  viewMode: 3,
}

export const useCropper = () => {
  const createCropper = (src: File | Blob, options: Cropper.Options = {}, croppedOptions: Cropper.GetCroppedCanvasOptions = {}) => {
    return new Promise((resolve, reject) => {
      createCropperInstance(src, { ...defaultCropperOptions, ...options }, croppedOptions, resolve, reject)
    })
  }

  return {
    createCropper,
  }
}
