<script setup>
  const details = await useAPI().get('/details', {
    fields: [
      'schedule_items.schedule_items_id.date',
      'schedule_items.schedule_items_id.title',
      'schedule_items.schedule_items_id.details',
      'schedule_items.schedule_items_id.photo',
      'schedule_page.title',
      'schedule_page.slug'
    ]
  });
</script>

<template>
  <div class="container">
    <div v-if="details.schedule_items?.length > 0" class="max-w-2xl mx-auto bg-white drop-shadow-xl">
      <hr class="w-full h-[2px] bg-gray-300 mt-24 mb-12" />

      <h1 class="text-center mb-12 text-3xl text-primary">Schedule</h1>

      <HomeScheduleItem class="my-8" v-for="item in details.schedule_items" :item="item.schedule_items_id" />

      <br />

      <div v-if="details.schedule_page?.slug" class="mx-8">
        <NuxtLink :to="`/page/${details.schedule_page.slug}`" class="btn bg-primary mx-auto">
          {{ details.schedule_page.title }}
        </NuxtLink>
      </div>

      <hr class="w-full h-[2px] bg-gray-300 mt-12 mb-24" />
    </div>
  </div>
</template>