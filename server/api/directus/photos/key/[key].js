import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const { directus } = useRuntimeConfig();
    const key = getRouterParam(event, 'key');
    const query = getQuery(event);

    // Get the asset id
    const id = await getSingletonItem('photos', {
        fields: [key]
    });

    // Return a stream to the directus asset
    sendStream(
        event,
        await $fetch(`${directus.url}/assets/${id}?${new URLSearchParams(query).toString()}`, {
            responseType: 'stream'
        }
    ));
})