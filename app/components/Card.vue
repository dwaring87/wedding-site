<script setup>
  const props = defineProps({
    title: String,
    icon: String
  })
</script>

<template>
  <div class="bg-gradient-to-b from-white to-gray-100 my-8 mx-1 sm:mx-2 md:mx-8 shadow-md rounded-md">
    <div v-if="title" class="bg-primary opacity-90 p-4 rounded-t-md">
      <h3 class="bg-primary flex items-center gap-2">
        <Icon v-if="icon" :name="icon" class="w-[24px] h-[24px]" />  
        {{ title }}
      </h3>
    </div>
    <div class="p-4 bg-white rounded-b-md">
      <slot></slot>
    </div>
  </div>
</template>