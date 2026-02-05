import { getSingletonItem } from "#server/utils/directus"
const { api_cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    const { fields } = getQuery(event);
    return await getSingletonItem('details', { fields });
}, {
  maxAge: api_cache,
  getKey: (event) => event.path
})