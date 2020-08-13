<template>
    <app-default-layout>
        <kro-surface>
            <kro-list-item :to="`/@${person.username}`" v-for="person in people">
                <template #icon><kro-avatar :src="`${person.profile.avatar}?width=48&height=48`" /></template>
                {{person.profile.displayName}}
                <template #subtitle>@{{person.username}}</template>
            </kro-list-item>
            <div v-if="loading" class="p-4 flex flex-row justify-center">
                <kro-spinner />
            </div>
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { getPeople } from '/@app/gql/query';
    import { useQuery, useResult } from '/@app/gql/composable';

    export const { result, loading, error } = useQuery(getPeople);
    export const people = useResult(result, null, data => data.users);

    export default {
        name: 'PeopleView',
    }
</script>

<style lang="scss">
    
</style>