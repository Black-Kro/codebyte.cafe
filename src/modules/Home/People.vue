<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <template v-if="people.length === 0 && !error">
                <template v-for="i in 10">
                    <user-identity skeleton />
                </template>
            </template>
            
            <user-identity
                v-for="person in people"

                :key="person.id"
                :to="`/@${person.username}`"
                :user="person"
             />

            <app-self-intersection @intersected="loadMore" v-if="hasNextPage">
                <kro-button @click="loadMore" :loading="loading" class="w-full">Load More</kro-button>
            </app-self-intersection>
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { GET_PEOPLE } from '/~/apollo/query';
    import { usePaginationResult, defaultPaginationUpdateQuery } from '/~/composables/usePagination';
    import { useQuery, useResult } from '@black-kro/use-apollo';

    export const { result, loading, error, fetchMore, refetch } = useQuery<any, any>(GET_PEOPLE, { 
            take: 10
        }, { 
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
        });
    export const next = useResult(result, null, data => data.users.next);
    export const people = useResult(result, [], data => data.users.nodes);
    export const hasNextPage = useResult(result, [], data => data.users.hasNextPage);

    export const loadMore = async () => {
        console.log('ok go');
        if (!loading.value && hasNextPage.value && people.value.length > 0)
            fetchMore({
                variables: { take: 10, after: next.value },
                updateQuery: defaultPaginationUpdateQuery('users')
            });
    };

    export default {
        name: 'PeopleView',
    }
</script>

<style lang="scss">
    
</style>