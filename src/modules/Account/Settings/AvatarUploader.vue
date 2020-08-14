<template>
    <div class="w-32">
        <app-me #me="{ me }">
            <div class="[ avatar-uploader ] [ relative rounded-full overflow-hidden w-32 h-32 ]">
                <kro-avatar :src="me.profile.avatar" class="w-32 h-32" />
                <div 
                    class=" [ avatar-uploader__screen ] 
                            [ absolute top-0 left-0 w-full h-full ] 
                            [ flex flex-row items-center justify-center ]
                            [ font-bold text-sm text-white ]">
                    Change <br />Avatar
                </div>
                <kro-spinner v-if="isLoading" class="absolute top-0 left-0 w-32 h-32" />
                <input class="[ absolute w-32 h-32 opacity-0 top-0 cursor-pointer rounded-full ]" type="file" @change="onChange" />
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
                <kro-button @click="setAvatar" primary>Set Avatar</kro-button>
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

    const { mutate } = useMutation<any, { avatar: string }>(UPDATE_PROFILE);
    
    export const onChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            url.value = URL.createObjectURL(file);
            isCropping.value = true;
        }
    };

    export const edit = (e) => {
        cropper = new Cropper(e.target, {
            aspectRatio: 1/1,
            viewMode: 3,
            
        });
    };

    export const setAvatar = () => {
        isLoading.value = true;

        if (cropper) {
            cropper.getCroppedCanvas({ imageSmoothingQuality: 'high', maxWidth: 512, maxHeight: 512 }).toBlob(async (blob) => {
                if (blob) {
                    try {
                        isCropping.value = false;
                        const media = await uploadMedia(blob);
                        const result = await mutate({ avatar: media[0] });
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