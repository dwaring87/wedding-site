import { updateItem, deleteItems } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);
    const resp = await updateItem('guests', id, body);
    await deleteItems('guests_dietary_restrictions', { "guests_id": { "_null": true } });
    return resp;
});