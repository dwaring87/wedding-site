import { getItems } from "#server/utils/directus"

export default defineEventHandler(async () => {
    return await getItems('meal_choices', {
        fields: ['id', 'name', 'description'],
        sort: 'sort'
    });
})