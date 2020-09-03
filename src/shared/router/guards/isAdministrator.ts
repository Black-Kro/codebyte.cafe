import { watch } from 'vue';
import { store } from '/~/shared/store/';
import { useMeAsync } from '/~/composables/useData';

const { getters } = store;

export const isAdministrator = async (to, from) => {
    const { me, error } = await useMeAsync();

    if (me)
        if (me.roles.indexOf('Admin') > -1)
            return true;

    return false;
};
