// FSD shared/config: backend API base URL.
// Configure with NUXT_PUBLIC_API_BASE. Empty string means same-origin relative requests,
// matching the legacy React app default (VITE_API_URL || "").
export function useApiBase(): string {
  return useRuntimeConfig().public.apiBase as string
}
