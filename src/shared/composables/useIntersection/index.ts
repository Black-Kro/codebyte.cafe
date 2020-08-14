import { onMounted, Ref } from 'vue';
import { useEventHook } from '../useEventHook';

export const useIntersection = (element: Ref<HTMLElement | null>) => {

    const intersectedEvent = useEventHook();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                observer.disconnect();
                intersectedEvent.trigger();
            }
        });
    });
    
    onMounted(() => {
        if (element.value)
            observer.observe(element.value);
    });

    return {
        onIntersected: intersectedEvent.on,
    }

};