<template>
  <div class="[ avatar-uploader ] [ relative ] [ rounded-md overflow-hidden ]">
    <user-me>
      <template #me="{ me }">
        <user-header :user="me" />

        <div
          class="[ avatar-uploader__scrim ] [ flex flex-row justify-center items-center ] [ absolute inset-0 w-full h-full font-bold text-sm ]"
        >
          Upload<br>Header
        </div>

        <input
          class="absolute inset-0 w-full h-full opacity-0"
          type="file"
          accept="image/*"
          @change="onChange"
        >
      </template>
    </user-me>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCropper, useMedia } from '/~/composables/'
import { useMutation } from '@black-kro/use-apollo'
import { UPDATE_PROFILE } from '/~/apollo/mutation'

export const isLoading = ref(false)

const { mutate: updateProfile } = useMutation<any, { header: string }>(
  UPDATE_PROFILE,
)
const { createCropper } = useCropper()
const { uploadMedia } = useMedia()

export const onChange = async({ target }) => {
  const { files } = target

  try {
    // Crop Media
    const cropped = await createCropper(
      files[0],
      { aspectRatio: 16 / 9 },
      { maxWidth: 1920, maxHeight: 1080 },
    )

    // Set Loading Status
    isLoading.value = true

    // Upload Media
    const media = await uploadMedia(cropped as File)

    console.log(media)

    // Update Profile 5f47ed73a5f5fe41653cd396
    await updateProfile({ header: media[0] })
  }
  catch (error) {
    console.log(error)
  }
  finally {
    target.value = null
    isLoading.value = false
  }
}

export default {
  name: '',
}
</script>

<style lang="scss">
</style>
