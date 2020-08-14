<template>
    <div>
        <app-me #me="{ me }">
            <div class="[ avatar-uploader ] [ relative overflow-hidden cursor-pointer ]">
                <app-lazy-image
                    placeholder="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=12&q=80"
                    :src="me.profile.headerImage"
                    :intrinsicWidth="1920"
                    :intrinsicHeight="1080"
                 />
                <div 
                    class=" [ avatar-uploader__screen ] 
                            [ absolute top-0 left-0 w-full h-full ] 
                            [ flex flex-row items-center justify-center ]
                            [ font-bold text-sm text-white ]">
                    Change <br />Header
                </div>
                <div class="w-full h-full flex flex-row items-center justify-center absolute top-0 left-0">
                    <kro-spinner v-if="loading" />
                </div>
                <input class="[ absolute w-full h-full opacity-0 top-0 cursor-pointer rounded-full ]" type="file" @change="onChange" />
            </div>
        </app-me>
        <kro-dialog class="max-w-6xl" v-model="isCropping" persistent>
            <template #default>
                <div class="avatar-uploader__cropper-container">
                    <img @load="edit" :src="url" />
                </div>
            </template>
            <template #footer="{ close }">
                <span class="flex-1"></span>
                <kro-button @click="close">Cancel</kro-button>
                <kro-button @click="setAvatar" primary>Set Header</kro-button>
            </template>
        </kro-dialog>
        <div class="text-center text-xs text-secondary font-bold mt-2">
            Max File Size: 5MB
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useDialog } from '@black-kro/ui';
    import { useMutation } from '/@app/gql/composable';
    import { UPDATE_PROFILE } from '/@app/gql/mutation';
    import { uploadMedia } from '/@app/services/';
    import Cropper from 'cropperjs';

    export const isLoading = ref(false);
    export const url = ref('');
    export const isCropping = ref(false);
    export const target = ref();
    let cropper: Cropper;

    const { mutate } = useMutation<any, { headerImage: string }>(UPDATE_PROFILE);
    
    export const onChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            url.value = URL.createObjectURL(file);
            isCropping.value = true;
        }
    };

    export const edit = (e) => {
        cropper = new Cropper(e.target, {
            aspectRatio: 16/9,
            viewMode: 3,
            
        });
    };

    export const setAvatar = () => {
        isLoading.value = true;

        if (cropper) {
            cropper.getCroppedCanvas({ imageSmoothingQuality: 'high', maxWidth: 3840, maxHeight: 2160 }).toBlob(async (blob) => {
                if (blob) {
                    try {
                        isCropping.value = false;
                        const media = await uploadMedia(blob);
                        const result = await mutate({ headerImage: media[0] });
                        isLoading.value = false;
                    } catch (error) {
                        isLoading.value = false;
                    }
                }
            });
        }
    };


    export default {
        name: '',
    }
</script>

<style lang="scss">
    

    .avatar-uploader {
        --kro-spinner-color: var(--kro-primary);

        &__screen {
            opacity: 0;
            transition: opacity 150ms ease-in-out;
            background: rgba(0, 0, 0, .56);
        }

        &__cropper-container {
            max-height: 50vh;
            position: relative;

            img {
                max-height: 50vh;
                max-width: 100%;
            }
        }

        &:hover {
            .avatar-uploader__screen {
                opacity: 1;
            }
        }
    }

</style>