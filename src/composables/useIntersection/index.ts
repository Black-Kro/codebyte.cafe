import { onMounted, onUnmounted, Ref, ref } from 'vue'
import { useEventHook } from '../useEventHook'

export const useIntersection = (element: Ref<HTMLElement | null>, once = true) => {
  const intersectedEvent = useEventHook()
  const notIntersectedEvent = useEventHook()
  const isIntersecting = ref(false)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (once) {
          observer.unobserve(entry.target)
          observer.disconnect()
        }
        isIntersecting.value = true
        intersectedEvent.trigger()
      }
      else {
        isIntersecting.value = false
        if (!once)
          notIntersectedEvent.trigger()
      }
    })
  })

  onMounted(() => {
    if (element.value)
      observer.observe(element.value)
  })

  onUnmounted(() => {
    if (element.value)
      observer.unobserve(element.value)
  })

  return {
    onIntersected: intersectedEvent.on,
    onNotIntersected: notIntersectedEvent.on,
    isIntersecting,
  }
}
