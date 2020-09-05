<template>
    <div class="container mx-auto h-full p-4 flex flex-col items-center justify-center">
        <kro-surface class="max-w-sm w-full">
            <kro-avatar class="w-24 h-24 mx-auto" :src="`https://avatars.dicebear.com/api/bottts/${avatarSeed}.svg`" />
            <form @click.prevent="signin" class="grid gap-4 py-2">
                <kro-textfield 
                    id="email" 
                    v-model="email"
                    type="email"
                    autofocus
                    label="Email"></kro-textfield>
                <kro-textfield 
                    id="password" 
                    v-model="password"
                    type="password" 
                    label="Password"></kro-textfield>
                <kro-button type="submit" :loading="loading" primary>Sign In</kro-button>
                <div class="text-center text-xs">
                    <router-link to="/sign-up">Don't have an account?</router-link>
                    <a class="ml-2" href="#">Forgot Password?</a>
                </div>
            </form>

            <kro-divider label="or" />

            <div class="grid gap-2 py-2" style="--kro-button-background: var(--kro-background)">
                <kro-button @click="signin('GOOGLE')"><kro-icon icon="google"/>Sign In with Google</kro-button>
                <kro-button @click="signin('GITHUB')"><kro-icon icon="github"/>Sign In with Github</kro-button>
            </div>
        </kro-surface>
        <div class="p-4 text-sm flex flex-row">
            <a rel="noreferrer noopener" target="_blank" href="/privacy-policy">Privacy Policy</a>
            <span class="mx-2">·</span>
            <a rel="noreferrer noopener" target="_blank" href="/privacy-policy">Terms of Service</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const { push } = useRouter();

    export const { dispatch, getters } = useStore();

    export const avatarSeed = Math.random() * 100;

    export const email = ref('');
    export const password = ref('');
    export const loading = ref(false);


    export const signin = async (provider?) => {
        loading.value = true;

        const stop = watch(() => getters['auth/status'], () => {
            if (getters['auth/status'] === 'AUTHENTICATED' || getters['auth/status'] === 'INCOMPLETE') {
                loading.value = false;
                stop();
                push({ path: '/' });
            }
        });

        try {
            await dispatch('auth/signIn', {
                email: email.value,
                password: password.value,
                provider: provider,
            });
        } catch (error) {
            loading.value = false;
        }
    };

    export default {
        name: 'SignIn',
    }
</script>

<style lang="scss">
    
</style>