const { directus } = useRuntimeConfig();

/**
 * Get a singleton collection item
 * 
 * @param {String} collection Collection Name
 * @param {Object} [query] Query Params (fields, filter, etc) 
 * @returns A object with the fields of the singleton item, unless just a 
 * single field is requested which will return just that field's value
 */
const getSingletonItem = async (collection, query = {}) => {
    const { data = {} } = await get(`/items/${collection}`, query);
    return query.fields && query.fields.length === 1 ? data[query.fields[0]] : data;
}

/**
 * Get items from a collection
 * 
 * @param {String} collection Collection Name
 * @param {Object} [query] Query Params (fields, filter, etc) 
 * @returns An array of objects, each object representing a matching item in the collection
 */
const getItems = async (collection, query = {}) => {
    const { data = [] } = await get(`/items/${collection}`, query);
    return data;
}

/**
 * Get a single item from a collection
 * 
 * @param {String} collection Collection Name
 * @param {String|Object} id_or_filter The item's unique ID or a filter object to find the item
 * @param {Object} [query] Additional query params (fields, etc) 
 * @returns An object representing the requested item from the collection
 */
const getItem = async (collection, id_or_filter, query = {}) => {
    // Get item by unique id
    if ( typeof id_or_filter === 'string' || id_or_filter instanceof String ) {
        const { data } = await get(`/items/${collection}/${id_or_filter}`, query);
        if ( data ) return data;
    }
    // Get item by filter
    else if ( typeof id_or_filter === 'object' && id_or_filter !== null ) {
        const { data } = await get(`/items/${collection}`, {
            filter: id_or_filter,
            ...query
        });
        if ( data && data.length === 1 ) return data[0];
    }
    throw createError({ status: 404, statusText: 'Item not found' });
}

/**
 * Make a GET request to the Directus API to the specified path
 * 
 * @param {String} path Directus API Path
 * @param {Object} [query] Query Params (fields, filter, etc) 
 * @returns the API response
 */
const get = async (path, query = {}) => {
    console.log(`[DIRECTUS] GET ${path}`);
    console.log(query);
    return await $fetch(`${directus.url}/${path.replace(/^\/|\/$/g, '')}`, {
        headers: { Authorization: `Bearer ${directus.token}` },
        query
    });
}


export { getSingletonItem, getItems, getItem }