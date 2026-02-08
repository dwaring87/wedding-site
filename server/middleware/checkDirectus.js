export default defineEventHandler(() => {
    const { directus } = useRuntimeConfig();
    if ( !directus.url || directus.url === '' ) {
        throw new Error('Directus URL not set [NUXT_DIRECTUS_URL env var]')
    }
    if ( !directus.token || directus.token === '' ) {
        throw new Error('Directus Token not set [NUXT_DIRECTUS_TOKEN env var]')
    }
})