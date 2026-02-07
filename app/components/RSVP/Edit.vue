<script setup>
  const details = await useAPI().get('/details');
  const meal_choices = await useAPI().get('/meal_choices');
  const dietary_restrictions = await useAPI().get('/dietary_restrictions');

  const props = defineProps({
    invitation: Object
  });
  const emit = defineEmits(['cancel']);
  const guests = ref(props.invitation.guests);

  const updateMealChoice = (index, selections) => {
    guests.value[index].meal_choice = { id: selections[0] };
  }

  const updateDietaryRestriction = (index, selections) => {
    guests.value[index].dietary_restrictions = selections.map((e) => ({ dietary_restrictions_id: { id: e }} ));
  }
  
  const cancel = () => {
    emit('cancel');
  }

  const saving = ref(false);
  const error = ref();
  const success = ref(false);
  const attending = ref(false);
  const save = async () => {
    saving.value = true;
    error.value = undefined;
    success.value = false;
    attending.value = false;
    let errors = [];

    window.scrollTo(0, 0);

    for ( let i = 0; i < guests.value.length; i++ ) {
      const guest = guests.value[i];
      guest.rsvp = !!guest.rsvp;  // force to boolean if not selected
      if ( guest.rsvp ) {
        attending.value = true;
      }

      await useSleep(500);
      try {
        await useAPI().patch(`/guests/${guest.id}`, guest);
      }
      catch (err) {
        errors.push(`Could not update Guest <strong><em>${guest.name}</em></strong> [${err}].`);
      }
    };

    if ( errors.length > 0 ) {
      error.value = errors.join(`<br /><br />`);
      error.value += `<br /><br />Please try again later.  If the issue persists, please reach out to us directly or email us at <a style="text-decoration: underline" href="mailto:${details.value.contact_email}?subject=[Contact] RSVP Errors">${details.value.contact_email}</a>.`;
    }
    else {
      success.value = true;
    }
  }
</script>

<template>
  <div>
    <h2>{{ invitation.name }}</h2>

    <RSVPLoading v-if="saving"
      loading="Updating Guest Information..."
      :error="error"
      :success="success"
      :attending="attending"
      @cancel="saving=false"
    />

    <div v-show="!saving">
      <div class="mx-1 sm:mx-2 md:mx-4 mt-4 mb-8 px-4 bg-gray-100 border border-gray-400 rounded-md shadow" 
          :id="`guest-container-${guest.id}`" v-for="(guest, index) in guests" :key="guest.id">

        <div class="group">
          <p>Name:</p>
          <input class="guest-name" v-model="guest.name" />
        </div>

        <div class="group">
          <p>Email:</p>
          <input class="guest-email" v-model="guest.email" />
          <p class="info">Enter your email to receive updates from us about the wedding</p>
        </div>

        <div class="group">
          <p>RSVP:</p>
          <FormToggle class="guest-rsvp" :enabled="guest.rsvp" @toggle="(s) => guest.rsvp = s" />
        </div>

        <div class="group">
          <p>Meal Choice:</p>
          <FormList :items="meal_choices" :selected="[guest.meal_choice?.id]" 
            @update="(s) => updateMealChoice(index, s)" />
        </div>

        <div class="group">
          <p>Dietary Restrictions:</p>
          <div class="flex flex-wrap gap-2">
            <FormList :items="dietary_restrictions" :selected="(guest.dietary_restrictions || []).map((e) => e?.dietary_restrictions_id?.id)" 
              @update="(s) => updateDietaryRestriction(index, s)" multi />
          </div>
          <p class="info">Select any dietary restrictions for this guest that we should know about</p>
        </div>

        <div class="group">
          <p>Comments:</p>
          <textarea class="guest-notes" v-model="guest.notes" rows="5"></textarea>
          <p class="info">Any other information we should know?</p>
        </div>

      </div>

      <div class="m-4 flex gap-4 justify-between">
        <button class="btn bg-gray-100" @click="cancel">Cancel</button>
        <button class="btn bg-primary" @click="save">Save</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .group {
    @apply flex flex-col gap-2 py-5;
  }
  .group p {
    @apply font-bold;
  }
  .group p.info {
    @apply text-sm font-normal italic text-gray-500;
  }
</style>