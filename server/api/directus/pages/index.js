import { getItems } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    return await getItems('pages', { sort: 'sort' });
})