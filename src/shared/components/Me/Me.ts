import { defineComponent, h } from 'vue';
import { GET_ME } from '/@app/gql/query';
import { useQuery, useResult } from '/@app/gql/composable';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'AppAuthSuspense',
    setup(props, { slots }) {
        const { getters } = useStore();

        const { result, loading, error } = useQuery(GET_ME);
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

            return h('div');
        };
    }
});