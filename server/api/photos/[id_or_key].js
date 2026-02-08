import { getSingletonItem } from "#server/utils/directus";
import { toBase64 } from "#server/utils/blobs";
const { cache } = useRuntimeConfig();

export default defineCachedEventHandler(async (event) => {
    const { directus } = useRuntimeConfig();
    const id_or_key = getRouterParam(event, 'id_or_key');
    const { type, ...params } = getQuery(event);

    // Get the asset id, if the key is given
    let id = id_or_key;
    if ( type === 'key' ) {
        id = await getSingletonItem('photos', {
            fields: [id_or_key]
        });
    }

    // Fetch the image from Directus
    // Then convert to base64 so it can be cached by nuxt
    const img = await $fetch(`${directus.url}/assets/${id}?${new URLSearchParams(params).toString()}`);
    const base64 = await toBase64(img);

    // Return the base64 image data and the mimetype
    return {
        image: base64,
        type: img.type
    };
}, { maxAge: cache.photo })