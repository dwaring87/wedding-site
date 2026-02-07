<script setup>
import FeaturedPagesItem from './FeaturedPagesItem.vue';

  const details = await useAPI().get('/details', {
    fields: [
      'featured_pages.featured_pages_id.header',
      'featured_pages.featured_pages_id.icon',
      'featured_pages.featured_pages_id.description',
      'featured_pages.featured_pages_id.photo',
      'featured_pages.featured_pages_id.page.title',
      'featured_pages.featured_pages_id.page.slug',
    ]
  });
</script>

<template>
  <div class="container mb-16">
    <div v-if="details.featured_pages?.length > 0">
      <FeaturedPagesItem class="my-8" v-for="(item, index) in details.featured_pages" 
        :item="item.featured_pages_id" :index="index" />
    </div>
  </div>
</template>