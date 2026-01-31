import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const { directus } = useRuntimeConfig();
    const key = getRouterParam(event, 'key');
    const query = getQuery(event);

    const id = await getSingletonItem('photos', {
        fields: [key]
    });

    await sendRedirect(event, `${directus.url}/assets/${id}?${new URLSearchParams(query).toString()}`, 302);
})