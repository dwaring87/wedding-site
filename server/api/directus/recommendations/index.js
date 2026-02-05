import { getItems } from "#server/utils/directus"
const { api_cache } = useRuntimeConfig();

export default cachedEventHandler(async () => {
    const recommendations = await getItems('recommendations', {
        fields: [
            'id', 'date_updated', 'name', 'location', 'description', 'image',
            'category.id', 'category.name',
            'website.id', 'website.title', 'website.url'
        ],
        sort: ['category.sort', 'name']
    });

    const categories = recommendations.map((e) => e.category.name);

    return { categories: [...new Set(categories)], recommendations }
}, {
  maxAge: api_cache,
  getKey: (event) => event.path
})