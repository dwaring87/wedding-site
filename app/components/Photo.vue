<script setup>
  const props = defineProps(['dKey'])
</script>

<template>
  <img :src="`/api/directus/photos/${props.dKey}`" />
</template>