import { defineComponent, h } from 'vue';
import { GET_ME } from '/~/gql/query';
import { useQuery, useResult } from '/~/gql/composable';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'AppAuthSuspense',
    setup(props, { slots }) {
        const { getters } = useStore();

        const { result, loading, error } = useQuery(GET_ME, {}, { fetchPolicy: 'cache-first' });
        const me = useResult(result, null, data => result.value.me);

        return () => {
            if (error.value && slots.error) {
                return slots.error();
            }

            if (loading.value && slots.loading) {
                return slots.loading();
            }

            if (me.value && slots.me) {
                return slots.me({
                    me: me.value
                });
            }

            if (slots.default) {
                return slots.default({
                    me: me.value,
                    loading: loading.value,
                    error: error.value
                });
            }
        };
    }
});