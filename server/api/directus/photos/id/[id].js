import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async (event) => {
    const { directus } = useRuntimeConfig();
    const id = getRouterParam(event, 'id');
    const query = getQuery(event);

    // Return a stream to the directus asset
    sendStream(
        event,
        await $fetch(`${directus.url}/assets/${id}?${new URLSearchParams(query).toString()}`, {
            responseType: 'stream'
        }
    ));
})