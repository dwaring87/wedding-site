<script setup>
  const props = defineProps({
    id: String,
    name: String,
    description: String,
    selected: Boolean
  });
  const emit = defineEmits(['toggle']);

  const toggle = () => {
    emit('toggle', !props.selected);
  }
</script>

<template>
  <button @click="toggle" 
      :class="{'border-2 border-primary': selected, 'border border-gray-100': !selected}" 
      class="p-4 rounded-md border-gray-300 bg-white/80 cursor-pointer w-full hover:bg-white">
    <div class="flex flex-row items-center gap-2">
      <Icon name="ri:checkbox-circle-line" class="text-primary w-[24px] h-[24px]" v-if="selected" />
      <Icon name="ri:checkbox-blank-circle-line" class="text-primary w-[24px] h-[24px]" v-else />
      <p :class="{'text-primary font-bold': selected}">{{ name }}</p>
    </div>
    <p v-if="description && description !== ''" class="text-sm text-left text-gray-400 pt-2">{{ description }}</p>
  </button>
</template>