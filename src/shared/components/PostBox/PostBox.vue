<template>
    <div class="app-post-box">
        <div class="p-4 flex flex-row items-center">
            <kro-avatar :src="getters['auth/user'].photoURL" />
            <div class="ml-4 flex flex-col">
                <span>{{getters['auth/user'].displayName}}</span>
                <span class="text-xs font-medium text-secondary">{{getters['auth/user'].email}}</span>
            </div>
        </div>
        <textarea 
            v-model="text"
            :placeholder="randomQuote()"
             @input="updateSize" 
             class="m-0 p-4 pt-0 block bg-transparent focus:outline-none w-full"></textarea>
        <div class="p-4 pt-2 flex flex-row">
            <kro-button icon="photo"></kro-button>
            <span class="flex-1"></span>
            <kro-button @click="createPost" :disabled="text.length === 0" primary><kro-icon icon="send" />Post</kro-button>
        </div>
        {{text}}
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useMutation } from '/@app/gql/composable';
    import gql from 'graphql-tag';

    export { randomQuote } from './data/quotes';
    export const text = ref('');


    export const { mutate, loading, onError, onDone } = useMutation(gql`
        mutation createPost($content: String!) {
            createPost(input: {
                content: $content
            }) {
                content
            }
        }
    `, { variables: {
        content: text.value
    }})

    export const createPost = () => {
        mutate({ content: text.value });
    };

    onDone(() => {
        text.value = '';
    });

    onError((error) => {
        console.error(error);
        alert('Error, Check Console');
    })

    export const { getters } = useStore();

    export const updateSize = (e) => {
        if (e.target) {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    }

    export default {
        name: 'AppPostBox',
        components: {
        }
    }
</script>

<style lang="scss">
    
    .app-post-box {
        ::placeholder {
            color: var(--kro-foreground-secondary);
        }
    }

</style>