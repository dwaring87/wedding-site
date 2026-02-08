import { updateItem, deleteItems, triggerGuestUpdatedFlow } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);

    // Update the guest properties
    const resp = await updateItem('guests', id, body);

    // Remove any unlinked dietary restrictions in the junction table
    await deleteItems('guests_dietary_restrictions', { "guests_id": { "_null": true } });

    // Trigger the guest updated flow
    triggerGuestUpdatedFlow(id);

    return resp;
});