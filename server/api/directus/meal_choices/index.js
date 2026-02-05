import { getItems } from "#server/utils/directus"
const { api_cache } = useRuntimeConfig();

export default cachedEventHandler(async () => {
    return await getItems('meal_choices', {
        fields: ['id', 'name', 'description'],
        sort: 'sort'
    });
}, {
  maxAge: api_cache,
  getKey: (event) => event.path
})