import { getItems } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default cachedEventHandler(async () => {
    return await getItems('dietary_restrictions', {
        fields: ['id', 'name'],
        sort: 'sort'
    });
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})