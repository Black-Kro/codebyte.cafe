<template>
    <div>
        <div class="app-cropper-container">
            <img class="block" :src="source" ref="target" />
        </div>
        <div class="flex flex-row flex-1 gap-4 pt-4">
            <span class="flex-1"></span>
            <kro-button @click="cancel">Cancel</kro-button>
            <kro-button @click="crop" primary>Crop</kro-button>
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref, onMounted } from 'vue';
    import Cropper from 'cropperjs';

    export const source = URL.createObjectURL(props.src);

    let cropper: Cropper;
    export const target = ref<HTMLImageElement | null>(null);

    export const cancel = () => {
        props.handle.reject();
    };

    export const crop = () => {
        cropper.getCroppedCanvas(props.croppedOptions).toBlob((blob) => {
            if (blob) {
                props.handle.resolve(blob);
            } else {
                props.handle.reject('Failed to crop');
            }
        }, props.src.type)

    }

    onMounted(() => {
        if (target.value) {
            cropper = new Cropper(target.value, props.options);
        }
    });

    export default {
        name: 'AppCropper',
    }

    declare const props: {
        src: any;
        handle: any;
        options: object;
        croppedOptions: any;
    }
</script>

<style lang="scss">
    
    .app-cropper-container {
        max-height: 80vh;
    }

</style>