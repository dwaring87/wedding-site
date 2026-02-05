<script setup>
  const pages = await useAPI().get('/pages');

  const props = defineProps({
    loading: {
      type: String,
      default: "Loading..."
    },
    error: String,
    success: Boolean,
    attending: Boolean,
    cancelLabel: {
      type: String,
      default: "Back"
    }
  });

  const emit = defineEmits(['cancel', 'continue']);
</script>

<template>
  <div>
    
    <!-- Loading / Error / Success Icons -->
    <div role="status" class="mx-auto w-fit mt-8 md:mt-20 mb-8">
      <div v-if="!error && !success">
        <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
      <div v-else-if="error">
        <Icon name="ri:error-warning-fill" class="text-secondary text-6xl" />
      </div>
      <div v-else-if="success">
        <Icon name="ri:checkbox-circle-fill" class="text-primary text-6xl" />
      </div>
    </div>

    <!-- Loading Message -->
    <div class="w-full text-center text-lg font-bold text-slate-700" v-if="!error && !success">
      <p v-html="loading"></p>
    </div>

    <!-- Error Message -->
    <div class="w-full my-8" v-if="error">
      <div class="bg-secondary p-4 rounded-md shadow-md mx-8" v-html="error"></div>
      <br />
      <button class="btn bg-primary mx-auto" @click="emit('cancel')" v-html="cancelLabel"></button>
    </div>

    <!-- Success Message -->
    <div class="w-full my-8" v-show="success">
      <div class="rounded-md shadow-md p-4 max-w-lg mx-auto bg-primary">
        <p class="mx-auto w-fit font-bold text-md md:text-lg">Guest Information Updated &mdash; Thank you!!</p>
        <div v-if="attending">
          <br />
          <p class="mx-auto w-fit font-semibold">We look forward to seeing you!</p>
          <br />
          <p>For more information, check out these pages on our website:</p>
          <ul class='list-disc ml-8'>
            <li v-for="page in pages" class="py-1">
              <NuxtLink class='underline font-bold' :to='`/page/${page.slug}`'>{{ page.title }}</NuxtLink>:
              {{ page.description }}
            </li>
          </ul>
        </div>
      </div>
      <Photo dKey="rsvp" width="600" class="mx-auto mt-8 w-full max-w-sm max-h-sm rounded-md shadow-md" />
    </div>
  </div>
</template>