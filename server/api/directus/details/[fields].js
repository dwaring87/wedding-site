import { getSingletonItem } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default cachedEventHandler(async (event) => {
    const fields = getRouterParam(event, 'fields');
    return await getSingletonItem('details', {
        fields: fields.split(',').filter((e) => e !== '')
    });
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})