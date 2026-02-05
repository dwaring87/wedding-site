<script setup>
  const route = useRoute();
  const details = await useAPI().get('/details');
  const pages = await useAPI().get('/pages');
</script>

<template>
  <div v-if="route.path !== '/'">
    <nav class="shadow-md bg-primary">
      <div class="container">
        <div class="h-14 flex justify-between items-center">
          <div>
            <NuxtLink to="/" class="flex items-center gap-2">
              <Icon :name="details.toolbar_icon" class="w-[24px] h-[24px]" />
              {{ details.couple }}
            </NuxtLink>
          </div>
          <div class="flex-grow"></div>
          <div class="flex gap-2 lg:gap-4">
            <NuxtLink v-for="(page) in pages" :to="`/page/${page.slug}`" 
                class="hidden md:inline" :class="{active: route.path.includes(page.slug)}">
              {{ page.title }}
            </NuxtLink>
            <NuxtLink to="/info" class="inline md:hidden flex items-center gap-2">
              <Icon name="ri:information-fill" class="w-[18px] h-[18px]" />
              <span>Info</span>
            </NuxtLink>
            <NuxtLink v-if="details.rsvp_enabled" to="/rsvp" class="flex items-center gap-2">
              <Icon name="ri:mail-check-fill" class="w-[18px] h-[18px]" />
              <span>RSVP</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  a {
    @apply font-semibold opacity-70 hover:opacity-100 px-1;
  }
  .active {
    @apply border-b-2 border-gray-100 border-opacity-20 opacity-90 hover:opacity-100 !important;
  }
</style>