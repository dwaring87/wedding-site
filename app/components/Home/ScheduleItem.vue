<script setup>
  const props = defineProps(['item']);
</script>

<template>
  <div class="flex flex-wrap justify-between items-center gap-4 px-4">
    <div class="flex-grow text-center">
      <p class="text-lg font-bold text-secondary text-shadow-md">
        {{ item.date }}
      </p>
      <p class="font-bold text-shadow-md">{{ item.title }}</p>
      <p v-html="item.details.replaceAll('\n', '<br />')"></p>
    </div>
    <Photo :d-id="item.photo" class="max-w-[300px] mx-auto rounded-md shadow-md" width="300" />
  </div>
</template>
  