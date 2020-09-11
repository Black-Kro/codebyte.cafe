<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <div class="text-sm font-bold">
                <div class="p-4 flex flex-row items-center">
                    <kro-icon icon="notifications" />
                    <span class="ml-2 text-lg">Notifications</span>
                </div>
                <div class="pb-4 pt-2">
                    <template v-if="notifications.length > 0">
                        <div
                            v-for="(notification, i) in notifications" 
                            :key="notification.id">
                            <app-notification class="px-4" :notification="notification" />
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

                <app-self-intersection @intersected="loadMore" v-if="hasNextPage">
                    <kro-button @click="loadMore" :loading="loading" class="w-full">Load More</kro-button>
                </app-self-intersection>
            </div>
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { useQuery, useResult } from '@black-kro/use-apollo';
    import { GET_NOTIFICATIONS } from '/~/apollo/query';
    import { defaultPaginationUpdateQuery } from '/~/composables/usePagination';

    export const { result, loading, error, fetchMore } = useQuery<any, any>(GET_NOTIFICATIONS, {
        take: 10,
        all: true,
    }, { fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true });

    export const next = useResult(result, null, data => data.notifications.next);
    export const notifications = useResult(result, [], data => data.notifications.nodes);
    export const hasNextPage = useResult(result, [], data => data.notifications.hasNextPage);

    export const loadMore = async () => {
        if (!loading.value && hasNextPage.value && notifications.value.length > 0)
            fetchMore({
                variables: { take: 10, after: next.value, all: true },
                updateQuery: defaultPaginationUpdateQuery('notifications')
            });
    };

    export default {
        name: 'NotificationsView',
    }
</script>

<style lang="scss">
    
</style>