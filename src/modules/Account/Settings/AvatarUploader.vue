<template>
    <div>
        <user-me #me="{ me }">
            <div class="[ avatar-uploader ] [ relative w-32 h-32 ] [ rounded-full overflow-hidden ]">
                <user-avatar 
                    :user="me"
                    :size="128"
                    class="absolute inset-0 w-full h-full" />
                <kro-spinner
                    v-if="isLoading"
                    class="w-32 h-32 absolute top-0 left-0" />

                <div 
                    class="
                        [ avatar-uploader__scrim ] 
                        [ flex flex-row justify-center items-center ] 
                        [ absolute inset-0 w-full h-full font-bold text-sm ]">
                    Upload<br />Avatar
                </div>

                <input 
                    @change="onChange"
                    class="absolute inset-0 w-full h-full opacity-0"
                    type="file"
                    accept="image/*" />
            </div>
        </user-me>
        <span class="text-center text-xs text-secondary font-bold block mt-2">
            Max File Size: 5MB
        </span>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useCropper, useMedia } from '/~/composables/';
    import { useMutation } from '/~/gql/composable';
    import { UPDATE_PROFILE } from '/~/gql/mutation';

    export const isLoading = ref(false);

    const { mutate: updateProfile } = useMutation<any, { avatar: string }>(UPDATE_PROFILE);
    const { createCropper } = useCropper();
    const { uploadMedia } = useMedia();

    export const onChange = async ({ target }) => {
        const { files } = target;

        try {
            // Crop Media
            const cropped = await createCropper(files[0], { aspectRatio: 1 / 1 }, { maxWidth: 124, maxHeight: 123 });
            
            // Set Loading Status
            isLoading.value = true;

            // Upload Media
            const media = await uploadMedia(cropped as File);
            console.log(media);

            // Update Profile
            await updateProfile({ avatar: media[0] });
        } catch (error) {
            console.log(error);
        } finally {
            target.value = null;
            isLoading.value = false;
        }

    }

    export default {
        name: 'AvatarUploadSettings',
    }
</script>

<style lang="scss">
    
    .avatar-uploader {

        &:hover {
            .avatar-uploader__scrim {
                opacity: 1;
            }
        }

        &__scrim {
            background: rgba(0, 0, 0, .48);
            opacity: 0;

            transition: opacity 150ms ease-in-out;
        }

    }

</style>