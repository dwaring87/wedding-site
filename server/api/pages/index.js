import { getItems } from "#server/utils/directus"
const { cache } = useRuntimeConfig();

export default defineCachedEventHandler(async (event) => {
    return await getItems('pages', { sort: 'sort' });
}, { maxAge: cache.api })