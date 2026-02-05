import { getItems } from "#server/utils/directus"
const { api_cache } = useRuntimeConfig();

export default cachedEventHandler(async () => {
    return await getItems('dietary_restrictions', {
        fields: ['id', 'name'],
        sort: 'sort'
    });
}, {
  maxAge: api_cache,
  getKey: (event) => event.path
})