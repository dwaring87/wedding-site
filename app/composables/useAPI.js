export default () => {
  const get = async (path, query) => {
    const key = `${path}?${JSON.stringify(query)}`;
    const { data } = await useAsyncData(key, () => $fetch(`/api/directus/${path.replace(/^\//, '')}`, { query }));
    return data;
  }

  return { get }
}