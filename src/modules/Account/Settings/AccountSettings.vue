<template>
    <h2 class="block pb-4 font-medium text-lg">Account Settings</h2>
    <div class="grid grid-cols-6 gap-4">
        <div class="col-span-2">
            <div class="grid justify-center content-center gap-4">
                <div class="relative rounded-full overflow-hidden">
                    <kro-avatar class="mx-auto w-32 h-32" :src="avatar" />
                    <kro-spinner v-if="isAvatarLoading" class="w-32 h-32 absolute top-0"></kro-spinner>
                    <div class="
                        [ absolute top-0 w-32 h-32 ] 
                        [ opacity-0 hover:opacity-100 ] 
                        [ transition-opacity ease-in-out duration-150 ]
                        [ flex flex-row items-center text-center justify-center ]
                        [ text-sm font-bold ]">
                        <div class="absolute bg-black opacity-50 w-full h-full"></div>
                        <span class="relative text-white">Change Avatar</span>
                        <input class="absolute w-32 h-32 opacity-0 top-0 cursor-pointer rounded-full" accept="image/*" type="file" @change="onFileUpload">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-4 grid gap-4">
            <kro-textfield disabled label="Username" v-model="username" />
            <kro-textfield label="Nickname" v-model="nickname" />
            <kro-textfield label="Bio" multiline v-model="bio" />
        </div>
    </div>
    <div class="flex flex-row pt-4">
        <span class="flex-1"></span>
        <kro-button primary><kro-icon icon="save"/>Save Settings</kro-button>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';

    import { useAxios } from '/@app/composables/';
    import { getMe } from '/@app/gql/query';
    import { updateProfile } from '/@app/gql/mutation';
    import { useQuery, useResult, useMutation } from '/@app/gql/composable';

    const { result, loading, error, onResult } = useQuery(getMe);
    const me = useResult(result);

    export const isAvatarLoading = ref(false);

    export const { 
        mutate: avatarUpdate, 
        loading: avatarUpdateLoading, 
        error: avatarUpdateError } = useMutation<any, { displayName?: string, bio?: string, avatar?: string, headerImage?: string }>(updateProfile);

    export const username = ref('');
    export const nickname = ref('');
    export const bio = ref('');
    export const avatar = ref('');

    const { post } = useAxios();

    export const onFileUpload = async (e) => {
        const { files } = e.target;
        const file = files[0];

        if (file) {
            isAvatarLoading.value = true;

            const formData = new FormData();
            formData.append('images', file, file.name);

            try {
                const response = await post('https://api.codebyte.cafe/api/media/upload/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const { data } = response;

                if (data.success) {
                    const avatarId = data.mediaIds[0];

                    avatarUpdate({
                        avatar: avatarId,
                    });
                    isAvatarLoading.value = false;
                }

            } catch (error) {
                console.log(error);
                alert('ERROR CHECK CONSOLE');
                isAvatarLoading.value = false;
            }
        }

    };

    onResult(() => {
        avatar.value = me.value.profile.avatar;
        username.value = `@${me.value.username}`;
        nickname.value = me.value.profile.displayName;
        bio.value = me.value.profile.bio;
    })

    export default {
        name: 'AccountSettings',
    }
</script>

<style lang="scss">
    
</style>