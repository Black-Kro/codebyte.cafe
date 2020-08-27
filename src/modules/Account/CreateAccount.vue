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
                <kro-button :loading="loading" :disabled="username.length === 0 || nickname.length === 0" primary>Create Account</kro-button>
            </form>
        </kro-surface>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAxios } from '/~/composables/';
    import { useStore } from 'vuex';

    export const username = ref('');
    export const nickname = ref('');
    export const bio = ref('');
    export const loading = ref(false);

    const { getters, dispatch } = useStore();

    export const errors = ref('');

    export const avatarSeed = Math.random() * 100;

    const { post } = useAxios();
    const { replace, push } = useRouter();

    export const createAccount = async () => {
        try {
            loading.value = true;
            const response = await post('/api/user', {
                username: username.value,
                nickname: nickname.value,
                bio: bio.value,
            });

            await dispatch('auth/checkStatus');

            if (getters['auth/status'] === 'AUTHENTICATED')
                replace({ path: '/' });
            else {
                console.log('FUCKK YOU');
            }
        } catch (error) {
            loading.value = false;
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