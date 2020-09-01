<template>
    <router-link 
        :to="`/@${notification.from.username}/${notification.source}`" 
        class="p-2 flex flex-row items-center text-current">
        <template v-if="notification.notificationType === 'Mention'">
            <user-avatar :size="36" :user="notification.from" />
            <div class="text-xs ml-2">
                <span class="font-bold">@{{notification.from.username}}</span>
                mentioned you in a post
            </div>
        </template>
    </router-link>
</template>

<script lang="ts" setup="props">
    export default {
        name: '',
    }

    declare const props: {
        notification: any;
    }
</script>

<style lang="scss">
    
</style>