<template>
    <div class="app-post-box">
        <div class="p-4 flex flex-row items-center">
            <app-me>
                <template #me="{ me }">
                    <kro-avatar :src="me.profile.avatar" />
                    <div class="ml-2 flex flex-col">
                        <span>{{me.profile.displayName}}</span>
                        <span class="text-xs font-medium text-secondary">@{{me.username}}</span>
                    </div>
                </template>
                <template #loading>
                    <kro-avatar color="var(--kro-background)" />
                </template>
            </app-me>
        </div>
        <textarea 
            v-model="content"
            :placeholder="randomQuote()"
            @input="updateSize" 
            class="m-0 p-4 pt-0 block bg-transparent focus:outline-none w-full resize-none"></textarea>
        <div class="p-4 pt-2 flex flex-row">
            <div class="relative">
                <kro-button icon="photo"></kro-button>
                <input type="file" multiple accept="image/*" class="absolute w-full h-full left-0 top-0 appearance-none opacity-0" @change="onSelectImages" />
            </div>
            <span class="flex-1"></span>
            <kro-button :loading="loading || isLoading" @click="postContent" :disabled="content.length === 0" primary><kro-icon icon="send" />Post</kro-button>
        </div>
    </div>
    <div v-if="images.length > 0" class="[ app-post-box__images ] [ grid grid-cols-4 ]">
        <div class="[ app-post-box__image ]" v-for="(image, i) in images" :key="image.name" class="flex flex-col items-center p-4">
            <div class="relative">
                <kro-button @click="removeImage(i)" class="[ app-post-box__image-remove ] w-8 h-8 rounded-full absolute top-0 right-0"><kro-icon icon="close" /></kro-button>
                <img class="w-100 h-24 object-cover rounded-md" :src="image.url"/>
            </div>
            <div class="grid text-center mt-2">
                <span class="truncate min-w-0">{{image.name}}</span>
                <span class="text-xs font-medium text-secondary">{{Math.round(image.size / 1000)}}Kb</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';

    import { useAxios } from '/@app/composables/';
    import { getPosts } from '/@app/gql/query';
    import { createPost } from '/@app/gql/mutation';
    import { useQuery, useMutation } from '/@app/gql/composable';
    export { randomQuote } from './data/quotes';

    export const content = ref('');
    export const images = ref<any>([]);

    export const isLoading = ref(false);

    export const { mutate, loading, onDone, onError } = useMutation<any, { content?: any, media?: any }>(createPost);
    const { refetch } = useQuery(getPosts, {  }, { fetchResults: false });
    const { post } = useAxios();

    onDone(() => {
        refetch();
        content.value = '';
        images.value = [];
        isLoading.value = false;
    });

    onError((error) => {
        console.error(error);
        alert('Check console for errors');
    });

    export const postContent = async () => {
        isLoading.value = true;

        try {
            if (images.value.length > 0) {
                const formData = new FormData();

                for (const image of images.value) {
                    formData.append('images', image.file);
                }

                const response = await post('https://api.codebyte.cafe/api/media/upload/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const { data } = response;

                if (data.success) {
                    const media = data.mediaIds;
                    mutate({ content: content.value, media: media });
                }
            } else {
                mutate({ content: content.value });
            }

        } catch (error) {
            isLoading.value = false;
        }

    };

    export const { getters } = useStore();

    export const updateSize = (e) => {
        if (e.target) {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    }

    export const onSelectImages = (e) => {
        const files = e.target.files as File[];

        const reader = new FileReader();
        images.value = Array.from(files).map((file: File) => ({ name: file.name, size: file.size, url: URL.createObjectURL(file), file }));        
    };

    export const removeImage = (index) => {
        images.value = images.value.filter((_, i) => i !== index);
    }

    export default {
        name: 'AppPostBox',
        components: {
        }
    }
</script>

<style lang="scss">
    
    .app-post-box {
        &__images {
            background: rgba(0, 0, 0, .12); 
            border-top: 1px solid var(--kro-divider);
        }

        ::placeholder {
            color: var(--kro-foreground-secondary);
        }
    }

    .app-post-box__image {
        
        .app-post-box__image-remove {
            top: -.5rem;
            right: -.5rem;
            opacity: 0;
        }

        &:hover {
            .app-post-box__image-remove {
                opacity: 1;
            }
        }
    }

</style>