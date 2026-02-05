import { updateItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);
    return await updateItem('guests', id, body);
});