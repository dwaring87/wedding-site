<script setup>
  const pages = await useAPI().get('/pages');
  useHead({
    title: "More Information"
  });
</script>

<template>
  <div class="container wedding-info py-8">
    <h1 class="text-center mb-8 text-primary">More Information</h1>

    <div class="w-full max-w-lg mx-auto px-4">
      <Photo d-key="info" class="rounded-md shadow-md border-2 border-white" width="600" />
    </div>

    <div class="mx-auto m-8 flex flex-wrap gap-8 justify-center">
      <div class="w-full sm:max-w-md px-8" v-for="(page) in pages" :key="page.slug">
        <h2>{{ page.title}}</h2>
        <p>{{ page.description }}</p>
        <NuxtLink :to="`/page/${page.slug}`"><button class="btn bg-primary">{{ page.title }}</button></NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wedding-info button {
    margin-top: 15px !important;
    margin-bottom: 40px;
    min-width: 50% !important;
  }
</style>