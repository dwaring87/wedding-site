import { getItem } from "#server/utils/directus"
const { api_cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    return await getItem('pages', {
        slug: { "_eq": slug }
    });
}, {
  maxAge: api_cache,
  getKey: (event) => event.path
})