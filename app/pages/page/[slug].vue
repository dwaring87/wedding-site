<script setup>
  const { params } = useRoute();
  const slug = params.slug;

  const page = await useAPI().get(`/pages/${slug}`);
</script>

<template>
  <div class="page">
    <h1 class="mb-8">{{ page.title }}</h1>
    <div class="content" v-html="page.content"></div>
  </div>
</template>