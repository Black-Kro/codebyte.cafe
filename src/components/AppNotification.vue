<template>
    <router-link 
        :to="`/@${notification.from.username}/${notification.source}`" 
        class="p-2 flex flex-row items-center text-current">
        <template v-if="notification.notificationType === 'Mention'">
            <user-avatar :size="36" :user="notification.from" />
            <div class="text-xs ml-2">
                <div>
                    <span class="font-bold">@{{notification.from.username}}</span>
                    mentioned you in a post
                </div>
                <div class="text-secondary font-bold text-xs">{{format(notification.created)}}</div>
            </div>
        </template>
        <template v-if="notification.notificationType === 'CommentLike'">
            <user-avatar :size="36" :user="notification.from" />
            <div class="text-xs ml-2">
                <div>
                    <span class="font-bold">@{{notification.from.username}}</span>
                    liked your post
                </div>
                <div class="text-secondary font-bold text-xs">{{format(notification.created)}}</div>
            </div>
        </template>
        <template v-if="notification.notificationType === 'Comment'">
            <user-avatar :size="36" :user="notification.from" />
            <div class="text-xs ml-2">
                <div>
                    <span class="font-bold">@{{notification.from.username}}</span>
                    replied your post
                </div>
                <div class="text-secondary font-bold text-xs">{{format(notification.created)}}</div>
            </div>
        </template>
    </router-link>
</template>

<script lang="ts" setup="props">
    export { format } from 'timeago.js';

    export default {
        name: '',
    }

    declare const props: {
        notification: any;
    }
</script>

<style lang="scss">
    
</style>