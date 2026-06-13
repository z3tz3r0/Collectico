// https://nuxt.com/docs/api/configuration/nuxt-config
// Feature-Sliced Design layout: srcDir is src/, framework dirs remapped into the app layer.
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'src/',
  dir: {
    pages: 'app/routes',
    layouts: 'app/layouts',
    middleware: 'app/middleware',
    plugins: 'app/providers',
  },
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  runtimeConfig: {
    public: {
      // Override at runtime with NUXT_PUBLIC_API_BASE.
      // Empty string means same-origin relative requests, matching the legacy React app default.
      apiBase: '',
    },
  },
  devtools: { enabled: true },
})
