// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    directus: {
      url: '',    // set with NUXT_DIRECTUS_URL env var
      token: ''   // set with NUXT_DIRECTUS_TOKEN env var
    }
  }
})