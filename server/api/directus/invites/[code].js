import { getItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')
    return await getItem('invitations', 
        {
            invite_code: { "_eq": code }
        },
        {
            fields: [
                'id', 'date_updated', 'invite_code', 'name',
                'guests.id', 'guests.name', 'guests.email', 'guests.rsvp', 'guests.notes',
                'guests.meal_choice.id', 'guests.dietary_restrictions.dietary_restrictions_id.id',
            ]
        }
    );
})