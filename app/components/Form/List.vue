<script setup>
  const props = defineProps({
    items: Array[Object],
    selected: Array[String],
    multi: Boolean
  });
  const emit = defineEmits(['update']);

  const selectedItems = ref(props.selected);
  const state = computed(() => {
    const s = {};
    props.items.forEach((i) => {
      s[i.id] = selectedItems.value.includes(i.id);
    });
    return s;
  });

  const toggle = (id, s) => {
    // Add to selection
    if ( !!s ) {
      if ( props.multi ) {
        selectedItems.value.push(id);
      }
      else {
        selectedItems.value = [id];
      }
    }

    // Remove from selection
    else {
      if ( props.multi ) {
        selectedItems.value = selectedItems.value.filter((e) => e !== id);
      }
      else {
        selectedItems.value = [];
      }
    }

    emit('update', selectedItems.value)
  }
</script>

<template>
  <div class="flex  flex-wrap gap-4">
    <FormListItem v-for="item in items" :key="item.id" 
      :id="item.id" :name="item.name" :description="item.description"
      :selected="state[item.id]" @toggle="(s) => toggle(item.id, s)" />
  </div>
</template>