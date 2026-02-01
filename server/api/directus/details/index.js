import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const { fields } = getQuery(event);
    return await getSingletonItem('details', { fields });
})