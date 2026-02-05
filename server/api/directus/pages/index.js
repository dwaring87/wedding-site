import { getItems } from "#server/utils/directus"
const { api_cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    return await getItems('pages', { sort: 'sort' });
}, {
  maxAge: api_cache,
  getKey: (event) => event.path
})