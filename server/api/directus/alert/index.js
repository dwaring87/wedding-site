import { getSingletonItem } from "#server/utils/directus"

export default defineEventHandler(async () => {
    const resp = await getSingletonItem('alert', {
        "filter": {
            "enabled": { _eq: true }
        }
    });
    return resp?.title && !!resp?.enabled ? resp : {}
})