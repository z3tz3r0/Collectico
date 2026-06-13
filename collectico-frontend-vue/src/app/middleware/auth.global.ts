import { useAuthStore } from '@/entities/user'

// Global route guard: protects routes that opt in with `definePageMeta({ requiresAuth: true })`.
// Session is bootstrapped by the auth-session plugin, so isAuthenticated is settled before this runs.
export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.requiresAuth) return
  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}
