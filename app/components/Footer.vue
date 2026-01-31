<script setup>
  const route = useRoute();
  const details = await useAPI().get('/details');
</script>

<template>
  <footer v-if="route.path !== '/'" class="bg-gray-200 border-t-1 border-gray-400">
    <div class="text-center text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
      <p>{{ details.couple }}</p>
      <p>{{ details.date }}</p>
      <p class="mt-4">{{ details.venue_name }}</p>
      <p>{{ details.venue_address }}</p>
      <p>{{ details.venue_town }}</p>
    </div>
  </footer>
</template>