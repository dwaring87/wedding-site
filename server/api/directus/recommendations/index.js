import { getItems } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

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
    const dates_updated = recommendations.map((e) => e.date_updated).sort((a, b) => new Date(b) - new Date(a));

    return { categories: [...new Set(categories)], recommendations, last_updated: dates_updated[0] }
}, {
  maxAge: cache.api,
  getKey: (event) => event.path
})