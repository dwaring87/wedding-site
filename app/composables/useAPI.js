export default () => {

  // Make a GET Request to the NUXT API
  const get = async (path, query) => {
    const key = `${path}?${JSON.stringify(query)}`;
    const { data } = await useAsyncData(key, () => $fetch(`/api/${path.replace(/^\//, '')}`, { query }));
    return data;
  }

  // Make a PATCH Request to the NUXT API
  const patch = async (path, body) => {
    return $fetch(`/api/${path.replace(/^\//, '')}`, {
      method: 'PATCH',
      body
    });
  }

  return { get, patch }
}