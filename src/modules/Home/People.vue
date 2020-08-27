<template>
    <app-default-layout>
        <kro-surface :padded="false">

            <user-identity
                v-for="person in people"

                :key="person.id"
                :to="`/@${person.username}`"
                :user="person"
             />

            <div v-if="loading" class="p-4 flex flex-row justify-center">
                <kro-spinner />
            </div>
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { GET_PEOPLE } from '/~/gql/query';
    import { useQuery, useResult } from '/~/gql/composable';

    export const { result, loading, error } = useQuery(GET_PEOPLE);
    export const people = useResult(result, null, data => data.users.nodes);

    export default {
        name: 'PeopleView',
    }
</script>

<style lang="scss">
    
</style>