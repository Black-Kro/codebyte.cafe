import { watch } from 'vue';
import { store } from '/~/shared/store/';
import { useMe } from '/~/composables';

const { getters } = store;

export const isAdministrator = async (to, from) => {
    const { me, loading } = useMe();

    if (me.value.roles.indexOf('SuperAdmin') > -1) {
        return true;
    }

    return false;
};
