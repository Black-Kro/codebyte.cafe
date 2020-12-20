<template>
  <div class="app-post-media">
    <div
      v-for="item in media"
      :key="item.id"
      class="[] [ relative ] [ cursor-pointer ]"
      @click="openPreview(item)"
    >
      <app-lazy-image
        :style="{ height: media.length > 1 ? '200px' : 'auto' }"
        :placeholder="item.metadata.base64"
        :intrinsic-width="item.metadata.width"
        :intrinsic-height="item.metadata.height"
        :src="
          media.length > 1 ? `${item.url}?size=350` : `${item.url}?size=700`
        "
      />
    </div>
  </div>
  <div>
    <kro-dialog
      v-model="shouldOpenPreview"
      class="max-w-6xl app-preview__container"
    >
      <app-lazy-image
        v-if="preview"
        class="[ app-preview-image ]"
        :intrinsic-width="preview.metadata.width"
        :intrinsic-height="preview.metadata.height"
        :placeholder="preview.metadata.base64"
        :src="preview.url"
      />
    </kro-dialog>
  </div>
</template>

<script lang="ts" setup="props">
import { ref } from 'vue'

declare const props: {
  media: object[]
}

export const preview = ref(null)
export const shouldOpenPreview = ref(false)

export const openPreview = (item) => {
  shouldOpenPreview.value = true
  preview.value = item
}

export default {
  name: 'PostMedia',
}
</script>

<style lang="scss">
.app-post-media {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
}

.app-preview-image {
  // width: auto;
  max-height: 80vh;
}

.app-preview__container {
  padding: 0 !important;
  overflow: hidden;
}
</style>
