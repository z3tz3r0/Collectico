import type { MaybeRefOrGetter, Ref } from 'vue'

// Vue port of the legacy React useDebounce hook. Returns a ref that trails the source value by
// `delay` ms, resetting the timer on every change. The timer is cleared when the owning scope is
// disposed, so it never fires after the component unmounts.
export function useDebounce<T>(source: MaybeRefOrGetter<T>, delay = 300): Ref<T> {
  const debounced = ref(toValue(source)) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | undefined

  watch(
    () => toValue(source),
    (value) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        debounced.value = value
      }, delay)
    },
  )

  onScopeDispose(() => {
    if (timer) clearTimeout(timer)
  })

  return debounced
}
