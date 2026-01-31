<script setup>
  const details = await useAPI().get('/details');
  const pages = await useAPI().get('/pages');
</script>



<template>
  <div class="block sm:hidden py-4 max-w-full bg-primary">

    <!-- Small Displays -->
    <div class="px-4 flex flex-wrap items-center justify-center gap-8">
      <NuxtLink v-for="(page) in pages" :to="`/page/${page.slug}`" class="info-link">
        {{ page.title }}
      </NuxtLink>
      <NuxtLink v-if="details.rsvp_enabled" to="/rsvp" class="flex items-center gap-2 info-link">
        <Icon name="ri:mail-check-fill" />
        <span>RSVP</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Larger Displays -->
  <div class="hidden sm:block py-4 mt-8 text-primary border-b-2 border-primary border-opacity-40 max-w-2xl mx-auto">
    <div class="flex flex-nowrap items-center justify-center gap-8">
      <NuxtLink v-for="(page) in pages" :to="`/page/${page.slug}`" class="info-link">{{ page.title }}</NuxtLink>
      <NuxtLink v-if="details.rsvp_enabled" to="/rsvp" class="flex items-center gap-2 info-link">
        <Icon name="ri:mail-check-fill" />
        <span>RSVP</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
  .info-link {
    @apply font-medium opacity-80 hover:opacity-100;
  }
</style>