import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async () => {
    return await getSingletonItem('details');
})