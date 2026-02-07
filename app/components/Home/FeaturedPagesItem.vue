<script setup>
  const props = defineProps(['item', 'index']);
</script>

<template>
  <div class="well w-full max-w-xl mx-auto">
    <div class="flex items-center mb-4">
      <Icon v-if="item.icon && item.icon !== ''" :name="item.icon" 
        class="text-5xl text-gray-400 mx-2 sm:mx-4 min-w-[30px]" />
      <p class="font-semibold text-lg md:text-xl flex-grow mx-4">{{ item.header }}</p>
    </div>
    <div class="flex flex-wrap sm:flex-nowrap items-center gap-4 md:gap-8" :class="{'flex-row-reverse': index % 2 === 1 && item.photo}">
      <div v-if="item.description" v-html="item.description" class="text-justify"></div>
      <Photo v-if="item.photo" :dId="item.photo" class="max-h-[200px] rounded-md shadow-md mx-auto" />
    </div>
    <NuxtLink v-if="item.page" class="mx-auto btn bg-primary" :to='`/page/${item.page?.slug}`'>
      {{ item.page?.title }}
    </NuxtLink>
  </div>
</template>