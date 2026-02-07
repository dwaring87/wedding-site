<script setup>
  const { params } = useRoute();
  const slug = params.slug;

  const page = await useAPI().get(`/pages/${slug}`);
  const recommendations = page.value.display_recommendations ? await useAPI().get('/recommendations') : {};

  const last_updated = ref(page.value.date_updated || page.value.date_created);
  if ( page.value.display_recommendations && recommendations.value.last_updated ) {
    if ( new Date(recommendations.value.last_updated) > new Date(last_updated.value) ) {
      last_updated.value = recommendations.value.last_updated;
    }
  }

  useHead({
    title: page.value.title
  })
</script>

<template>
  <div class="page">
    <h1 class="mb-8 text-primary">{{ page.title }}</h1>
    <div class="content" v-html="page.content"></div>
    <br /><br />
    <Recommendations v-if="page.display_recommendations" />
    <div class="flex justify-center md:justify-end mt-12 md:pr-8">
      <p class="text-gray-400 text-shadow-sm">Last Updated: {{ new Date(last_updated).toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<style>
  div.content img {
    @apply rounded-md shadow-md w-full md:max-w-[90%] mx-auto my-4 md:my-8;
  }
</style>