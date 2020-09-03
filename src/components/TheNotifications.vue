<template>
    <div class="relative">
        <div 
            v-if="notificationCount > 0"
            class=" [ notification-badge ] [ absolute right-0 z-10 w-5 h-5 transform translate-x-2 -translate-y-2 ] 
                    [ font-bold text-xs flex items-center justify-center ]
                    [ rounded-full bg-red-600 ]">
                    <span>{{notificationCount}}</span>
                </div>
        <kro-menu @open="onOpen" left bottom>
            <template #activator="{ open }">
                <kro-button @click="open" icon="notifications">
                </kro-button>
            </template>
            <template #default="{ close }">
                <div class="w-64 py-2">
                    <template v-if="notifications.length > 0">
                        <div
                            v-for="(notification, i) in notifications" 
                            :key="notification.id">
                            <app-notification :notification="notification" />
                            <kro-divider v-if="i !== notifications.length - 1" class="my-2" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex flex-col items-center content-center text-secondary py-8">
                            <kro-icon style="--kro-icon-size: 5rem" icon="cactus" />
                            <span class="text-xs font-bold text-secondary">No Notifications Here</span>
                        </div>
                    </template>
                </div>
            </template>
        </kro-menu>
    </div>
</template>

<script lang="ts" setup>
    import { useQuery, useResult, useMutation, useSubscription } from '@black-kro/use-apollo';
    import { GET_NOTIFICATION_COUNT, GET_NOTIFICATIONS } from '/~/apollo/query/notifications';
    import { MARK_NOTIFICATIONS_AS_READ } from '/~/apollo/mutation';
    import { SUBSCRIBE_TO_NOTIFICATION_COUNT } from '/~/apollo/subscriptions';

    export const { loading, result, error, subscribeToMore } = useQuery(GET_NOTIFICATION_COUNT);
    export const notificationCount = useResult(result, 0, r => r.notificationCount);

    export const { mutate: markAllAsRead } = useMutation(MARK_NOTIFICATIONS_AS_READ);
    export const { refetch, result: notificationResults } = useQuery(GET_NOTIFICATIONS, {  }, { fetchResults: false });
    export const notifications = useResult(notificationResults, [], n => n.notifications.nodes);

    export const onOpen = async () => {
        await refetch();

        // Mark all notifications as read. Not sure if this is the best solution, but for right now
        // it is what we will use.
        markAllAsRead();
    }

    subscribeToMore(() => ({
        document: SUBSCRIBE_TO_NOTIFICATION_COUNT,
        updateQuery: (previousResult, { subscriptionData }) => {
            return {
                notificationCount: subscriptionData.data.updatedNotificationCount
            };
        }
    }));

    export default {
        name: '',
    }
</script>

<style lang="scss">
    
    .notification-badge {
        box-shadow: 0 0 0 4px var(--kro-background-secondary);
    }

</style>