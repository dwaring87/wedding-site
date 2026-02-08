import { getItems } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default defineCachedEventHandler(async () => {
    return await getItems('dietary_restrictions', {
        fields: ['id', 'name'],
        sort: 'sort'
    });
}, { maxAge: cache.api })