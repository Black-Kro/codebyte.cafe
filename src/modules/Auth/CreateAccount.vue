<template>
    <div class="container mx-auto h-full p-4 flex flex-col items-center justify-center">
        <kro-surface class="max-w-sm w-full">
            <kro-avatar class="w-24 h-24 mx-auto" :src="`https://avatars.dicebear.com/api/bottts/codebyte.svg`" />

            <form @submit.prevent="createAccount" class="grid py-2">
                <kro-textfield
                    :loading="isUsernameLoading"
                    :error="usernameError.length > 0"
                    :success="isUsernameValid"
                    label="Username*" 
                    required
                    v-model="username" />

                <div class="pt-1 pb-3 px-4">
                    <span class="text-xs font-medium text-red-700">{{usernameError}}</span>
                </div>

                <kro-textfield
                    :loading="isNicknamLoading"
                    :error="nicknameError.length > 0"
                    :success="isNicknameValid"
                    label="Nickname*" 
                    required
                    v-model="nickname" />

                <div class="pt-1 pb-3 px-4">
                    <span class="text-xs font-medium text-red-700">{{nicknameError}}</span>
                </div>
                
                <kro-textfield 
                    label="Bio" 
                    multiline
                    v-model="bio" />
                <kro-button class="mt-4" :loading="isLoading" :disabled="!canSubmit" primary>Create Account</kro-button>
            </form>
        </kro-surface>
        <kro-alert class="mt-4" v-if="error.length > 0" type="error">{{error}}</kro-alert>
        <div class="p-4 pb-0 max-w-sm w-full text-center text-sm">
            By creating an account you are agreeting to our Privacy Policy and our Terms of Service.
        </div>
        <div class="p-4 text-sm flex flex-row">
            <a rel="noreferrer noopener" target="_blank" href="/privacy-policy">Privacy Policy</a>
            <span class="mx-2">·</span>
            <a rel="noreferrer noopener" target="_blank" href="/privacy-policy">Terms of Service</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useDebounceFn } from '@vueuse/core';
    import { useDialog } from '@black-kro/ui';
    import { useAxios, useFormValidation } from '/~/composables';

    const { post } = useAxios();
    const { getters, dispatch } = useStore();
    const { createDialog } = useDialog();

    export const isLoading = ref(false);
    export const error = ref('');

    export const username   = ref('');
    export const nickname   = ref('');
    export const bio        = ref('');

    export const { 
        valid: isUsernameValid, 
        error: usernameError, 
        loading: isUsernameLoading } = useFormValidation('/api/validation/username/', username, 'Username');

    export const {
        error: nicknameError,
        valid: isNicknameValid,
        loading: isNicknamLoading } = useFormValidation('/api/validation/nickname/', nickname, 'Nickname');

    export const canSubmit = computed(() => {
        return isNicknameValid.value && isUsernameValid.value;
    })


    /**
     * Create User
     */

    const { replace } = useRouter();

    export const createAccount = async () => {
        isLoading.value = true;

        try {
            const response = await post('api/user', { 
                username: username.value, 
                nickname: nickname.value, 
                bio: bio.value 
            });

            await dispatch('auth/checkStatus');

            if (getters['auth/status'] === 'AUTHENTICATED')
                replace({ path: '/' })
            else
                createDialog({
                    title: 'Oops',
                    message: 'Uh oh, there was an error creating your account. Please try again later. If this issue persists, pleace contact the admins for help',
                    icon: 'error',
                    style: 'centered',
                    resolveButton: { text: 'Close' },
                    rejectButton: { text: '', hidden: true }
                })

        } catch (e) {
            if (e.response) {
                if (e.response.data.errors) {
                    const errors = e.response.data.errors;
                    error.value = Object.values(errors[0].constraints)[0] as string;
                } else {
                    error.value = e.response.data.message;
                }
            }
        } finally {
            isLoading.value = false;
        }

    };

    export default {
        name: 'CreateAccount',
    }
</script>

<style lang="scss">
    
    .textfield-spinner {
        --kro-spinner-size: 1.5rem;
    }

</style>