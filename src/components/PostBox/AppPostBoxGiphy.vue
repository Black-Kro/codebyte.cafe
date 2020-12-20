<template>
  <div class="ml-2">
    <kro-dialog
      v-model="isOpen"
      class="[ giphy ] w-full h-full max-w-xl overflow-hidden"
      @close="onClose"
    >
      <template #activator="{ open }">
        <kro-button
          :disabled="disabled"
          icon="mdi:gif"
          @click="open"
        />
      </template>
      <template #default="{ close }">
        <div class="giphy-content flex flex-col h-full">
          <div class="p-4 cla">
            <div class="flex flex-row items-center px-4 bg-primary rounded-md">
              <kro-icon icon="mdi:magnify" />
              <input
                v-model="query"
                type="text"
                class="w-full px-4 py-2 rounded-sm bg-transparent focus:outline-none"
                placeholder="Search..."
              >
            </div>
          </div>
          <kro-divider class="my-0" />
          <div class="max-h-full h-full overflow-auto relative">
            <div v-if="query.length === 0" class="p-4 grid gap-4 grid-cols-2">
              <app-post-box-giphy-category
                name="Annoyed"
                src="https://media2.giphy.com/media/kpzfYwBT7nUVW/giphy.gif?cid=ecf05e47rle9e28w62d7kbfps1qiy9ko4igbc82jhcmn8tjd&rid=giphy.gif"
                @click="query = 'annoyed'"
              />
              <app-post-box-giphy-category
                name="Shrug"
                src="https://media3.giphy.com/media/jPAdK8Nfzzwt2/giphy.gif?cid=ecf05e47asxhp8thuqp4rxos09gmn8e0sngk5b4u5sdxcu0i&rid=giphy.gif"
                @click="query = 'shrug'"
              />
              <app-post-box-giphy-category
                name="Awkward"
                src="https://media1.giphy.com/media/unFLKoAV3TkXe/giphy.gif?cid=ecf05e47vwtgnffenr0sesi7ozgyhi6kd2zwr4h9bv2syiwt&rid=giphy.gif"
                @click="query = 'awkward'"
              />
              <app-post-box-giphy-category
                name="Ew"
                src="https://media1.giphy.com/media/3oriOiN0eR08su5G4E/giphy.gif?cid=ecf05e47biaawpgsradl9qde7c09zpm6ktra4gwsla68josu&rid=giphy.gif"
                @click="query = 'ew'"
              />
              <app-post-box-giphy-category
                name="Surprised"
                src="https://media0.giphy.com/media/XR9Dp54ZC4dji/giphy.gif?cid=ecf05e47kh8ckulz46n9ddohabk708r5y6b9wgbt1p9922hn&rid=giphy.gif"
                @click="query = 'surprised'"
              />
              <app-post-box-giphy-category
                name="President"
                src="https://media3.giphy.com/media/d5fOmhU24QKMZ2Wv3m/giphy.gif?cid=ecf05e47wbw8lxv4ym0xax6c04okqlcg3g53sh02ywag3s1i&rid=giphy.gif"
                @click="query = 'president'"
              />
              <app-post-box-giphy-category
                name="Bruh"
                src="https://media.giphy.com/media/3o7TKVfu4rwyscasla/giphy.gif"
                @click="query = 'bruh'"
              />
              <app-post-box-giphy-category
                name="ok boomer"
                src="https://media.giphy.com/media/PnggNmuamz7kbgfUTL/giphy-downsized.gif"
                @click="query = 'ok boomer'"
              />
            </div>

            <div
              v-if="isLoading"
              class="w-full h-full flex items-center justify-center p-4 pt-8"
            >
              <kro-spinner />
            </div>

            <div v-else class="p-4 grid gap-4 grid-cols-2">
              <app-post-box-gif-preview
                v-for="gif in gifs"
                :key="gif.id"
                :gif="gif"
                @click="
                  () => {
                    $emit('select', gif);
                    close();
                  }
                "
              />
            </div>
            <div
              v-if="gifs.length > 0 && !(isLoading && !isLoadingMore)"
              class="p-4 pt-0"
            >
              <app-self-intersection @intersected="loadMore">
                <kro-button
                  class="w-full"
                  :loading="isLoadingMore"
                  @click="loadMore"
                >
                  Load More
                </kro-button>
              </app-self-intersection>
            </div>
          </div>

          <div class="flex flex-row justify-center py-4">
            <img src="/~/assets/giphy.png">
          </div>
        </div>
      </template>
    </kro-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGiphy } from '/~/composables'
import { useDebounceFn } from '@vueuse/core'

const { giphy } = useGiphy()

export const isLoading = ref(false)
export const isLoadingMore = ref(false)
export const isOpen = ref(false)
export const gifs = ref<any>([])
export const query = ref('')
export const offset = ref(0)

export const search = useDebounceFn(async() => {
  const results = await giphy.search(query.value, {
    limit: 16,
    offset: offset.value,
  })

  offset.value = offset.value + 16
  gifs.value = results.data
  isLoading.value = false
}, 250)

export const loadMoreQuery = useDebounceFn(async() => {
  const results = await giphy.search(query.value, {
    limit: 16,
    offset: offset.value,
  })
  offset.value = offset.value + 16
  gifs.value = [...gifs.value, ...results.data]
  isLoadingMore.value = false
}, 250)

export const loadMore = () => {
  if (!isLoadingMore.value && !isLoading.value && gifs.value.length > 0) {
    isLoadingMore.value = true
    loadMoreQuery()
  }
}

watch(
  () => query.value,
  async() => {
    offset.value = 0
    isLoading.value = true
    search()
  },
)

export const onClose = () => {
  query.value = ''
  gifs.value = []
  offset.value = 0
}

export default {
  name: 'AppPostBoxGiphy',
  props: {
    disabled: Boolean,
  },
  emits: ['select'],
}
</script>

<style lang="scss">
.giphy {
  max-height: 70vh;
  padding: 0 !important;
}

.giphy-content {
  max-height: 70vh;
}

.giphy-container {
  // display: flex;
  // flex-direction: column;
  column-count: 2;
  column-gap: 1rem;
}

.giphy-category-scrim {
  background: rgba(0, 0, 0, 0.48);
}

.giphy-category-label {
  text-shadow: 2px 2px 0 black;
}

.giphy__prompt {
  --kro-icon-size: 5rem;
}
</style>
