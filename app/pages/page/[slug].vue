<script setup>
  const { params } = useRoute();
  const slug = params.slug;

  const page = await useAPI().get(`/pages/${slug}`);
</script>

<template>
  <div class="page">
    <h1 class="mb-8 text-primary">{{ page.title }}</h1>
    <div class="content" v-html="page.content"></div>
    <br /><br />
    <Recommendations v-if="page.display_recommendations" />
  </div>
</template>

<style>
  div.content img {
    @apply rounded-md shadow-md w-full md:max-w-[90%] mx-auto my-4 md:my-8;
  }
</style>