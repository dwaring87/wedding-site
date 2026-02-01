<script setup>
  const props = defineProps(['dId', 'dKey', 'width', 'height', 'quality', 'format', 'fit', 'transforms'])
  const { width, height, quality, format, fit, transforms } = props;

  const params = computed(() => {
    const o = {};
    if ( width ) o.width = width;
    if ( height ) o.height = height;
    if ( quality ) o.quality = quality;
    if ( format ) o.format = format;
    if ( fit ) o.fit = fit;
    if ( transforms ) o.transforms = transforms;
    return new URLSearchParams(o).toString()
  });
</script>

<template>
  <img v-if="props.dKey" :src="`/api/directus/photos/key/${props.dKey}?${params}`" />
  <img v-else-if="props.dId" :src="`/api/directus/photos/id/${props.dId}?${params}`" />
</template>