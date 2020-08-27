<template>
    <div v-if="files.length > 0" class="[ app-post-box__images ] [ p-4 ]">
        <div class="grid grid-cols-4 gap-4">
            <div v-for="file in files" class="relative">
                <app-post-box-media-preview :file="file" />
                <div class="absolute top-0 right-0 -mr-2 -mt-2">
                    <kro-button @click="editFile(file)" class="w-8 h-8" icon="edit" />
                    <kro-button @click="removeFile(file)" class="w-8 h-8 ml-1" icon="delete" />
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center pt-4">
            <div class="flex-1"></div>
            <span class="text-secondary text-xs font-medium mr-1">{{totalSize}}MB / 5MB</span>
            <app-progress-ring :color="totalSize > 5 ? 'var(--kro-error)' : 'var(--kro-foreground)'" :stroke="4" :radius="16" :progress="totalSize / 5 * 100" />
        </div>
    </div>
</template>

<script lang="ts" setup="props, { emit }">
    import { computed } from 'vue';
    import { useCropper } from '/~/composables/';

    const { createCropper } = useCropper();

    export const totalSize = computed(() => {
        return (props.files.reduce((count, o) => count + o.size, 0) / (1024 * 1024)).toFixed(2);
    });

    export const editFile = async (file: File) => {
        try {
            const cropped = await createCropper(file, {  }, {
                maxWidth: 1920,
                maxHeight: 1080,
            });
            emit('update:files', props.files.map(f => f === file ? cropped : f));
        } catch (error) {
        }
    };

    export const removeFile = (file: File) => {
        emit('update:files', props.files.filter(f => f !== file));
    }

    export default {
        name: 'PostBoxMedia',
    }

    declare const props: {
        files: File[]
    }

    declare const emit: any;
</script>

<style lang="scss">
    
    .app-post-box__images {
        background: rgba(0, 0, 0, .12);
        border-top: 1px solid var(--kro-divider);
    }

</style>