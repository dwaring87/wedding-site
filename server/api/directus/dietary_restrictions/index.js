import { getItems } from "#server/utils/directus"

export default defineEventHandler(async () => {
    return await getItems('dietary_restrictions', {
        fields: ['id', 'name'],
        sort: 'sort'
    });
})