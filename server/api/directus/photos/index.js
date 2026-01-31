import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const { fields = '' } = getQuery(event)
    return await getSingletonItem('photos', {
        fields: fields.split(',').filter((e) => e !== '')
    });
})