<script setup>
  const details = await useAPI().get('/details');
  console.log("APP");
  console.log(details);

  useHead({
    titleTemplate: (title) => {
      return title && title.includes(details.value.couple) ? title : (title ? `${details.value.couple} - ${title}` : details.value.couple);
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: `${details.value.couple} are getting married! Join the celebration on ${details.value.date} at ${details.value.venue_name} in ${details.value.venue_town}.`, hid: 'description' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: details.value.primary_color },
      { name: 'theme-color', content: details.value.primary_color }
    ],
    // link: [
    //   { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=2' },
    //   { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=1' },
    //   { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=1' },
    //   { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png?v=1' },
    //   { rel: 'manifest', href: '/site.webmanifest?v=2' },
    //   { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=3', color: '#065f46' },
    //   { rel: 'shortcut icon', href: '/favicon.ico?v=2' }
    // ]
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  .bg-primary {
    background-color: v-bind(details.primary_color);
    color: v-bind(details.primary_color_text);
  }
  .bg-primary-reversed {
    background-color: v-bind(details.primary_color_text);
    color: v-bind(details.primary_color);
  }
  .text-primary {
    color: v-bind(details.primary_color);
  }
  .border-primary {
    border-color: v-bind(details.primary_color);
  }

  .bg-secondary {
    background-color: v-bind(details.secondary_color);
  }
</style>