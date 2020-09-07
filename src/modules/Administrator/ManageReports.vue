<template>
    <app-default-layout>
        <kro-surface :padded="false">
            <kro-list-item
                :to="`/administrator/reports/${report.id}`"
                class="cursor-pointer"
                v-for="report in reports">
                {{report.content}}
                <template #subtitle>
                    <span>Reported by @{{report.author.username}}</span>
                    <span class="mx-2">·</span>
                    <span>Reported {{format(report.created)}}</span>
                </template>
                <template #action>
                    <kro-icon icon="arrow-right" />
                </template>
            </kro-list-item>

            <div v-if="loading" class="p-4 flex flex-row justify-center">
                <kro-spinner />
            </div>
        </kro-surface>
    </app-default-layout>
</template>

<script lang="ts" setup>
    import { GET_REPORTS } from '/~/apollo/query';
    import { useQuery, useResult } from '@black-kro/use-apollo';
    
    export { format } from 'timeago.js';

    export const { result, loading, error } = useQuery(GET_REPORTS);
    export const reports = useResult(result, null, data => data.reports.nodes);

    export default {
        name: 'ManageReports',
    }
</script>

<style lang="scss">
    
</style>