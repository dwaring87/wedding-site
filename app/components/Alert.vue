<script setup>
  const alert = await useAPI().get('/alert');
  const displayAlert = ref(alert.enabled);
</script>

<template>
  <div v-if="alert?.enabled && displayAlert" class="m-0 w-full md:my-4 md:mx-auto md:max-w-xl md:shadow-xl">
    <div class="alert rounded-none">
      <div class="flex gap-4 items-center">
        <Icon name="ri:alert-fill" class="w-[32px] h-[32px]" />
        <div>
          <div class="flex border-b border-gray-50/30 mb-2">
            <p class="flex-grow text-lg"><strong>{{ alert.title }}</strong></p>
            <Icon name="ri:close-circle-fill" @click="displayAlert = false" class="relative -top-3 -right-3 w-[24px] h-[24px] hover:cursor-pointer" />
          </div>
          <div class="w-full" v-html="alert.message"></div>
        </div>
      </div>
    </div>
  </div>
</template>