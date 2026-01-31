import { getItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    return await getItem('pages', {
        slug: { "_eq": slug }
    });
})