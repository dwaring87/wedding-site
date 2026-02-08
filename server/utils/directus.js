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
 * Update a single item in a collection
 * 
 * @param {String} collection Collection Name
 * @param {String} id Item ID
 * @param {Object} body An object representing the fields to update
 * @returns An object representing the new state of the item
 */
const updateItem = async (collection, id, body = {}) => {
    const { data } = await patch(`/items/${collection}/${id}`, body);
    return data;
}

/**
 * Remove one or more items from a collection
 * 
 * @param {String} collection Collection Name
 * @param {String|Object} id_or_filter The item(s)'s unique ID or a filter object to find the item(s)
 * @param {Object} [query] Additional query params (fields, etc) 
 * @returns 
 */
const deleteItems = async (collection, id_or_filter, query = {}) => {
    // Get item by unique id
    if ( typeof id_or_filter === 'string' || id_or_filter instanceof String ) {
        return await remove(`/items/${collection}/${id_or_filter}`, undefined, query);
    }
    // Get item by filter
    else if ( typeof id_or_filter === 'object' && id_or_filter !== null ) {
        return await remove(`/items/${collection}`, { query: { filter: id_or_filter } }, query);
    }
    throw createError({ status: 404, statusText: 'Item(s) not found' });
}

/**
 * Trigger the Guest Updated Flow with the guest id
 * @param {String} guest_id Guest ID
 * @returns 
 */
const triggerGuestUpdatedFlow = async (guest_id) => {
    return await post(directus.guest_updated_trigger, { guest: guest_id });
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
    try {
        return await $fetch(`${directus.url}/${path.replace(/^\/|\/$/g, '')}`, {
            headers: { Authorization: `Bearer ${directus.token}` },
            query
        });
    }
    catch (err) {
        throw new Error(`Unable to fetch data from the CMS [${err}]`);
    }
}

/**
 * Make a PATCH request to the Directus API to the specified path
 * 
 * @param {String} path Directus API Path
 * @param {Object} body Body Params (fields to update)
 * @returns the API Response
 */
const patch = async (path, body = {}) => {
    console.log(`[DIRECTUS] PATCH ${path}`);
    console.log(body);
    try {
        return await $fetch(`${directus.url}/${path.replace(/^\/|\/$/g, '')}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${directus.token}` },
            body
        });
    }
    catch (err) {
        throw new Error(`Unable to update data in the CMS [${err}]`);
    }
}

/**
 * Make a POST request to the Directus API to the specified path
 * 
 * @param {String} path Directus API Path
 * @param {Object} body Body Params
 * @returns the API Response
 */
const post = async (path, body = {}) => {
    console.log(`[DIRECTUS] POST ${path}`);
    console.log(body);
    try {
        return await $fetch(`${directus.url}/${path.replace(/^\/|\/$/g, '')}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${directus.token}` },
            body
        });
    }
    catch (err) {
        throw new Error(`Unable to send data to the CMS [${err}]`);
    }
}

/**
 * Make a DELETE request to the Directus API to the specified path
 * 
 * @param {String} path Directus API Path
 * @param {Object} body Body Params (items to remove - array of ids or object of filter)
 * @param {Object} query Query Params
 * @returns the API Response
 */
const remove = async(path, body = {}, query = {}) => {
    console.log(`[DIRECTUS] DELETE ${path}`);
    console.log(body);
    console.log(query);
    try {
        return await $fetch(`${directus.url}/${path.replace(/^\/|\/$/g, '')}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${directus.token}` },
            body,
            query
        });
    }
    catch (err) {
        throw new Error(`Unable to delete data in the CMS [${err}]`);
    }
}


export { getSingletonItem, getItems, getItem, updateItem, deleteItems, triggerGuestUpdatedFlow }