import { getSingletonItem } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    const { fields } = getQuery(event);
    return await getSingletonItem('details', { fields });
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})