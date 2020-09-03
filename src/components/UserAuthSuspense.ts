import { defineComponent, h } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
    name: 'UserAuthSuspense',
    setup(props, { slots }) {
        const { getters } = useStore();

        return () => {
            if (getters['auth/status'] === 'PENDING' && slots.pending)
                return slots.pending();

            if (getters['auth/status'] === 'UNKNOWN' && slots.authenticated)
                return slots.authenticated();

            if (getters['auth/status'] === 'INCOMPLETE' && slots.incomplete)
                return slots.incomplete();

            if (getters['auth/status'] === 'AUTHENTICATED' && slots.authenticated)
                return slots.authenticated();

            if (getters['auth/status'] === 'UNAUTHENTICATED' && slots.unauthenticated)
                return slots.unauthenticated();

            return h('div');
        };
    }
});