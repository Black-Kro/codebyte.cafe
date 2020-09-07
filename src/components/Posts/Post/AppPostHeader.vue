<template>
    <user-identity :avatar="false" class="pl-0"  :to="`/@${post.author.username}`" :user="post.author">
        <template #subtitle> · {{format(post.created)}}</template>
        <template #default>
            <div class="flex flex-row items-center h-full">
                <kro-menu :key="post.id" left>
                    <template #activator="{ open, close: closeMenu }">
                        <kro-button class="w-8 h-8 self-center" @click="open" icon="chevron-down"></kro-button>
                    </template>
                    <div>
                        <kro-dialog>
                            
                        </kro-dialog>
                        <kro-dialog v-model="isReportDialogOpen">
                            <template #activator="{ open }">
                                <kro-list-item
                                    @click="open" 
                                    class="cursor-pointer">
                                    <template #icon><kro-icon icon="error" /></template>
                                    {{t('posts.ReportPost')}}
                                </kro-list-item>
                            </template>
                            <template #header>
                                <div class="flex flex-row">
                                    <kro-icon icon="error" class="mr-2" />
                                    Report Post
                                </div>
                            </template>
                            <div>
                                <p class="text-secondary font-medium pb-4">
                                    Please provide a short description as to why you believe this post violates our content policies.
                                </p>
                                <kro-textfield multiline v-model="reportText" label="Reason" />
                            </div>
                            <template #footer="{ close }">
                                <span class="flex-1"></span>
                                <kro-button @click="close">Cancel</kro-button>
                                <kro-button :disabled="reportText.length === 0" @click="reportPost(close)" primary>Report</kro-button>
                            </template>
                        </kro-dialog>
                        <kro-list-item
                            v-if="canDeletePost"
                            @click="beforeDeletePost" 
                            class="cursor-pointer">
                            <template #icon><kro-icon icon="delete" /></template>
                            {{t('posts.DeletePost')}}
                        </kro-list-item>
                    </div>
                </kro-menu>
            </div>
        </template>
    </user-identity>       
</template>

<script lang="ts" setup="props">
    import { computed, ref } from 'vue';
    import { useMutation, useQuery, useResult, useLazyQuery } from '@black-kro/use-apollo';
    import { useContent, usePost } from '/~/apollo/api';
    import { GET_POSTS, GET_ME, GET_REACTIONS } from '/~/apollo/query';
    import { useMe, useToast } from '/~/composables';
    import { useDialog } from '@black-kro/ui';
    import { useI18n } from 'vue-i18n';
    import { IPost } from '/~/types';

    export { format } from 'timeago.js';

    export const isReportDialogOpen = ref(false);
    export const reportText = ref('');

    const { createConfirmationDialog } = useDialog();

    export const { t } = useI18n();
    export const { deletePost, canDeletePost } = usePost(props.post);
    export const { createContentReport } = useContent();

    export const { fetch } = useLazyQuery(GET_REACTIONS);

    export const beforeDeletePost = async () => {
        createConfirmationDialog({
            title: 'Delete Post?',
            message: 'Are you sure you want to delete this post?',
            icon: 'error',
            style: 'centered',
            resolveButton: {
                text: 'Delete',
                attributes: { error: true, }
            }
        })
            .then(() => { deletePost() })
    };

    export const reportPost = async (done) => {
        await createContentReport(reportText.value, props.post.id, 'Post');
        done();
    }

    export default {
        name: 'PostHeader',
    }

    declare const props: {
        post: any;
    }
</script>

<style lang="scss">
    
</style>