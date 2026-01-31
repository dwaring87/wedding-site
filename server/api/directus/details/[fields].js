import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const fields = getRouterParam(event, 'fields');
    return await getSingletonItem('details', {
        fields: fields.split(',').filter((e) => e !== '')
    });
})