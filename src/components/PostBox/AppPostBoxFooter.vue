<template>
    <div class="flex flex-row px-4 pb-4 items-center">
        <div class="relative">
            <kro-button icon="photo" />
            <input
                 @change="onFilesSelected"

                multiple 
                accept="image/*"
                class="absolute top-0 left-0 w-full h-full opacity-0"
                type="file" />
        </div>
        <app-post-box-poll class="ml-2" />
        <app-post-box-giphy />
        <span class="flex-1"></span>
        <app-progress-ring
            v-if="content.length > 0"

            :progress="Math.min(500, content.length) / 500 * 100"
            :radius="18"
            :stroke="4"
            :color="content.length < 500 ? 'white' : 'var(--kro-error)'"
            class="mr-2"
         />
        <kro-button
            :disabled="!canPost"
            @click="$emit('submit')" 
            primary>
            {{$t('post-box.Post')}}
        </kro-button>
    </div>
</template>

<script lang="ts" setup="props, { emit, attrs }">
    import { computed } from 'vue';


    export const canPost = computed(() => {
        return props.content.length > 0 && props.content.length < 500 || props.media.length > 0;
    });

    export const onFilesSelected = (e) => {
        const files = e.target.files;
        emit('update:files', [...attrs.files, ...Array.from(files)]);
        e.target.value = null;
    }

    export default {
        name: 'PostBoxFooter',
        emits: ['update:files', 'submit']
    }

    declare const props: {
        content: string;
        media: any;
    }

    declare const emit: any;
    declare const attrs: any;
</script>

<style lang="scss">
    
</style>