<script setup>
  const route = useRoute();
</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <Toolbar class="fixed top-0 left-0 w-full z-30" />
    <Alert class="fixed inset-x-0 bottom-0 sm:bottom-2 z-40"/>
    <main :class="{'pt-14': route.path !== '/'}">
      <slot></slot>
    </main>
    <Footer class="mt-auto"></Footer>
  </div>
</template>

<style src="@/assets/css/main.css"></style>