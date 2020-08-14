<template>
    <h2 class="block pb-4 font-medium text-lg">Account Settings</h2>
    <div class="grid grid-cols-none md:grid-cols-8 lg:grid-cols-8 gap-4">
        <div class="col-span-1 md:col-span-2 lg:col-gap-2 flex flex-row justify-center">
            <avatar-uploader />
        </div>
        <div class="col-span-1 md:col-span-6 lg:col-gap-6 grid gap-4">
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
    import AvatarUploader from './AvatarUploader.vue';

    import { useAxios } from '/@app/composables/';
    import { GET_ME } from '/@app/gql/query';
    import { UPDATE_PROFILE } from '/@app/gql/mutation';
    import { useQuery, useResult, useMutation } from '/@app/gql/composable';
    import Cropper from 'cropperjs';

    const { result, loading, error, onResult } = useQuery(GET_ME);
    const me = useResult(result);


    export const username = ref('');
    export const nickname = ref('');
    export const bio = ref('');


    onResult(() => {
        username.value = `@${me.value.username}`;
        nickname.value = me.value.profile.displayName;
        bio.value = me.value.profile.bio;
    })

    export default {
        name: 'AccountSettings',
        components: { AvatarUploader }
    }
</script>

<style lang="scss">
    
</style>