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
    cache: {
      api: 15,    // Cache length for most API routes (seconds), change with NUXT_CACHE_API env var
      photo: 300  // Cache length for photos API route (seconds), change with NUXT_CACHE_PHOTOS env var
    },
    directus: {
      url: '',      // set with NUXT_DIRECTUS_URL env var
      token: '',    // set with NUXT_DIRECTUS_TOKEN env var
      guest_updated_trigger: '/flows/trigger/dd126d60-20f5-4cbb-8b09-6a74e70754ed'
    }
  }
})