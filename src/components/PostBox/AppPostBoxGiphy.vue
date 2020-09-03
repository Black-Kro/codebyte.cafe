<template>
    <div class="ml-2">
        <kro-dialog class="[ giphy ] w-full h-full max-w-xl overflow-hidden" @open="onOpen" v-model="isOpen">
            <template #activator="{ open }">
                <kro-button icon="gif" @click="open"></kro-button>
            </template>
            <div class="giphy-content flex flex-col h-full">
                <div class="p-4">
                    <div class="flex flex-row items-center px-4 bg-primary rounded-md">
                        <kro-icon icon="search" />
                        <input type="text" class="w-full px-4 py-2 rounded-sm bg-transparent focus:outline-none" placeholder="Search...">
                    </div>
                </div>
                <kro-divider class="my-0" />
                <div v-if="isLoading" class="block p-4 flex flex-row justify-center">
                    <kro-spinner></kro-spinner>
                </div>
                <div v-else class="[ giphy-container ] [ max-h-full overflow-auto p-4 bg-primary ]">
                    <div v-for="category in categories" class="relative mb-4">
                        <img class="w-full" :src="category.gif.images.downsized_medium.url"/>
                        <div class="giphy-category-scrim absolute inset-0 flex flex-row items-center justify-center">
                            <span class="[ giphy-category-label ] font-bold capitalize sh">{{category.subcategories[0].name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </kro-dialog>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useGiphy } from '/~/composables'
    
    const { giphy } = useGiphy();


    export const isLoading = ref(true);
    export const isOpen = ref(false);
    export const gifs = ref<any>([]);
    export const categories = ref<any>([]);
    // const categories = [
    //     'trending', 'agree', 'applause', 'awww', 'dance', 'deal with it', 'do not want', 'eww', 'eye roll', 'facepalm', 'fist bump',
    //     'good luck', 'hearts', 'high five', 'hug', 'idk', 'kiss', 'mic drop', 'no', 'omg', 'oh snap', 'ok', 'oops', 'please',
    //     'popcorn', 'SMH', 'scared', 'shocked', 'shrug', 'sigh', 'slow clap', 'sorry', 'thank you', 'thumbs down', 'thumbs up', 'want']

    export const onOpen = async () => {

        categories.value = (await giphy.categories()).data;
        isLoading.value = false;

        console.log('on open')
        // const results = await giphy.search('one punch man', { limit: 15, offset: 0 });
        // console.log(results.data[0]);
    
        // categories.value = await giphy.categories()
        // gifs.value = results.data;
    }


    export default {
        name: '',
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
        background: rgba(0, 0, 0, .48)
    }

    .giphy-category-label {
        text-shadow: 2px 2px 0 black;
    }

</style>