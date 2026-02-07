import { getItem } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    return await getItem('pages', {
        slug: { "_eq": slug }
    });
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})