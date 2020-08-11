<template>
    <div class="container mx-auto h-full p-4 flex items-center justify-center">
        <kro-surface class="max-w-sm w-full">
            <kro-avatar class="w-24 h-24 mx-auto" :src="`https://avatars.dicebear.com/api/bottts/${avatarSeed}.svg`" />

            <form @submit.prevent="createAccount" class="grid gap-4 py-2">
                <kro-alert v-if="errors" type="error">{{errors}}</kro-alert>

                <kro-textfield 
                    label="Username*" 
                    required
                    v-model="username" />
                <kro-textfield 
                    label="Nickname*" 
                    required
                    v-model="nickname" />
                <kro-textfield 
                    label="Bio" 
                    multiline
                    v-model="bio" />
                <kro-button :disabled="username.length === 0 || nickname.length === 0" primary>Create Account</kro-button>
            </form>
        </kro-surface>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAxios } from '/@app/composables/';

    export const username = ref('');
    export const nickname = ref('');
    export const bio = ref('');

    export const errors = ref('');

    export const avatarSeed = Math.random() * 100;

    const { post } = useAxios();
    const { replace } = useRouter();

    export const createAccount = async () => {
        try {
            const response = await post('https://api.codebyte.cafe/api/profile/create', {
                username: username.value,
                displayName: nickname.value,
                bio: bio.value,
            });

            console.log(response);
            console.log(response.data);

            replace('/');
        } catch (error) {
            console.log(error);
            errors.value = error;
        }
    };

    export default {
        name: 'CreateAccount',
    }
</script>

<style lang="scss">
    
</style>