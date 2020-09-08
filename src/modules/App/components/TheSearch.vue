<template>
    <div v-if="isScrimShowing" @click="() => hideScrim()" class="search-scrim inset-0 fixed w-full h-full"></div>
    <div class="[ w-full flex flex-col items-center relative ] [ rounded h-10 ]">
        <div class="[ the-search ] w-full flex flex-row items-center bg-primary h-full rounded" :class="{ 'the-search__focused': focused }">
            <kro-icon class="ml-4" icon="search" />
            <input 
                @focus="onFocus"
                @blur="onBlur"
                @input="search"
                v-model="query" 
                :placeholder="$t('common.Search')" 
                type="text" 
                class="flex-1 bg-transparent px-4 outline-none" />
        </div>
        <div v-if="shouldShowResults" class="[ the-search__results ] w-full bg-primary absolute">
            <div v-if="isLoading" class="p-4 flex flex-row items-center justify-center">
                <kro-spinner />
            </div>
            <div class="p-4 flex flex-col items-center justify-center" v-else-if="error">
                <kro-icon class="search-results__icon" icon="error" />
                <span class="font-bold text-sm mt-2 text-secondary">Oops, there was an error</span>
            </div>
            <div v-else-if="result">
                <template v-if="users.length > 0">
                    <user-identity 
                        @click="() => hideScrim()" 
                        v-for="user in users" 
                        :to="`/@${user.username}`" 
                        :key="user.id" 
                        :user="user" />
                </template>
                <div v-else class="p-4 flex flex-col items-center justify-center">
                    <kro-icon icon="cactus" class="search-results__icon" />
                    <span class="font-bold text-sm mt-2 text-secondary">Alas, your stalking has yielded no results. Perhaps try once more?</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch, computed } from 'vue';
    import { useLazyQuery, useResult } from '@black-kro/use-apollo';
    import { SEARCH_USERS } from '/~/apollo/query';
    import { useDebounceFn } from '@vueuse/core';

    export const focused = ref(false);

    export const query = ref('');
    export const { fetch, result, loading, error, onResult, onError } = useLazyQuery(SEARCH_USERS, { query: '' });
    export const users = useResult(result, [], x => x.search.nodes);

    export const isLoading = ref(false);

    export const shouldShowResults = ref(false);
    export const isScrimShowing = ref(false);

    export const executeSearch = useDebounceFn(async () => { 
        await fetch({ query: query.value }); 
        isLoading.value = false 
    }, 250);

    onResult(() => isLoading.value = false);
    onError(() => isLoading.value = false);

    export const search = async () => {
        if (query.value.length > 2) {
            showScrim();
        } else {
            hideScrim();
        }

        if (query.value.length > 2) {
            isLoading.value = true;
            executeSearch();
        }
    }


    /**
     * Handle Displaying the scrim.
     */

    export const onBlur = () => {
        focused.value = false;
    }

    export const onFocus = () => {
        focused.value = true;

        if (query.value.length > 2)
            showScrim();
    }

    export const showScrim = () => {
        if (!isScrimShowing.value) {
            window.addEventListener('keydown', hideScrim);
            isScrimShowing.value = true;
            shouldShowResults.value = true;
        }
    }

    export const hideScrim = (e?) => {
        if ((e && e.key === 'Escape') || !e) {
            // Hide the scrim
            isScrimShowing.value = false;
            shouldShowResults.value = false;
        }
    }


    export default {
        name: 'TheSearch',
    }
</script>

<style lang="scss">

    .the-search {
        border: 1px solid var(--kro-background-secondary);
    }

    .the-search__focused {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border: 1px solid var(--kro-divider);
    }

    .the-search__results {
        border: 1px solid var(--kro-divider);
        border-top: none;
        top: 100%;
        opacity: 1;
        // display: none;
    }

    .search-results__icon {
        --kro-icon-size: 3rem;
    }

</style>