import { Ref, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useAxios } from '../useAxios';

export const useFormValidation = (endpoint: string, value: Ref, field: string) => {

    const { get } = useAxios();

    const error = ref('');
    const valid = ref(false);
    const loading = ref(false);

    const validate = useDebounceFn(async () => {

        try {
            if (value.value.length > 0) {
                const response = await get(`${endpoint}${value.value}`);
                
                valid.value = true;
                error.value = '';
            } else {
                valid.value = false;
                error.value = `${field} is required`;
            }
        } catch (e) {
            valid.value = false;
            if (e.response) {
                if (e.response.data.errors) {
                    const errors = e.response.data.errors;
                    error.value = Object.values(errors[0].constraints)[0] as string;
                } else {
                    error.value = e.response.data.message;
                }
            }
        } finally {
            loading.value = false;
        }
    }, 500);

    watch(() => value.value, () => {
        loading.value = true;
        validate();
    });

    return {
        loading,
        valid,
        error,
    }

};