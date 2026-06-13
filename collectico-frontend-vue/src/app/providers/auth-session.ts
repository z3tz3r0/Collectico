import { useAuthStore } from '@/entities/user'

// FSD app layer: bootstrap the session once on app init (SSR forwards cookies, client hydrates the result).
export default defineNuxtPlugin(async () => {
  await useAuthStore().verifyToken()
})
