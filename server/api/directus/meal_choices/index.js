import { getItems } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default cachedEventHandler(async () => {
    return await getItems('meal_choices', {
        fields: ['id', 'name', 'description'],
        sort: 'sort'
    });
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})