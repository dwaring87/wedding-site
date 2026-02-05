<script setup>
  const details = await useAPI().get('/details');
</script>

<template>
  <div class="max-w-lg mx-auto">
    <Card title="RSVPs Closed" icon="ri:close-circle-fill" class="max-w-lg">
      <div v-if="details.rsvp_closed_message" v-html="details.rsvp_closed_message"></div>
      <div v-else>
        <p>If you need to make a change to your RSVP, please contact us directly.  You can email us 
          at <a class="underline text-primary" :href="`mailto:${details.contact_email}?subject=[Contact] RSVP Help`">{{ details.contact_email }}</a>.
        </p>
        <p class="mt-8 ml-8">&mdash;&nbsp;&nbsp;{{ details.couple }}</p>
      </div>
    </Card>
  </div>
</template>