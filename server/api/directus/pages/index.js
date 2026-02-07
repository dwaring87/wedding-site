import { getItems } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    return await getItems('pages', { sort: 'sort' });
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})