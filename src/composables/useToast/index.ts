import { ref } from 'vue';

export const toastInstances = ref<any>([]);

const createToastInstance = (options, resolve, reject) => {

    const instance = {
        ...options,
        resolve,
        reject,
        destroy () {
            toastInstances.value.splice(toastInstances.value.indexOf(this), 1);
        }

    };

    toastInstances.value = [
        ...toastInstances.value,
        instance,
    ]

};

interface ToastOptions {
    title: string;
    message: string;
    icon: string;
    duration?: number;
}

export const useToast = () => {

    const createToast = (options: ToastOptions) => {
        return new Promise((resolve, reject) => {
            createToastInstance(options, resolve, reject)
        });
    };


    return {
        createToast,
    }

};