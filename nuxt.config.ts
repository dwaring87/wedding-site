// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    api_cache: 15,  // Cache length for most API routes (seconds), change with NUXT_API_CACHE env var
    directus: {
      url: '',      // set with NUXT_DIRECTUS_URL env var
      token: ''     // set with NUXT_DIRECTUS_TOKEN env var
    }
  }
})