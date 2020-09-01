<template>
    <div class="relative">
        <div 
            v-if="notificationCount > 0"
            class=" [ notification-badge ] [ absolute right-0 z-10 w-5 h-5 transform translate-x-2 -translate-y-2 ] 
                    [ font-bold text-xs flex items-center justify-center ]
                    [ rounded-full bg-red-600 ]">
                    <span>{{notificationCount}}</span>
                </div>
        <kro-menu left bottom>
            <template #activator="{ open }">
                <kro-button @click="open" icon="notifications">
                </kro-button>
            </template>
            <template #default="{ close }">
                {{notificationCount}}
            </template>
        </kro-menu>
    </div>
</template>

<script lang="ts" setup>
    import { useQuery, useResult, useSubscription } from '/~/gql/composable';
    import { GET_NOTIFICATION_COUNT } from '/~/gql/query/notifications';
    import { SUBSCRIBE_TO_NOTIFICATION_COUNT } from '/~/gql/subscriptions';

    export const { loading, result, error, subscribeToMore } = useQuery(GET_NOTIFICATION_COUNT);
    export const notificationCount = useResult(result, 0, r => r.notificationCount);

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