<script setup>
  const details = await useAPI().get('/details');

  const props = defineProps({
    code: String
  });
  const emit = defineEmits(['getInvitation']);

  const input = ref();
  const invite_code = ref('');
  watch(invite_code, (new_invite_code) => {
    new_invite_code = new_invite_code.toLowerCase();
    new_invite_code = new_invite_code.replace(/[^a-z]/g, "-");
    new_invite_code = new_invite_code.replace(/-+/g, "-");
    invite_code.value = new_invite_code;
  });

  const error = ref();
  const looking = ref(false);
  const lookup = async () => {
    if ( invite_code.value && invite_code.value !== '' ) {
      error.value = undefined;
      looking.value = true;

      let invitation = await useAPI().get(`/invites/${invite_code.value}`);
      await useSleep(500);

      if ( invitation && invitation.value ) {
        looking.value = false;
        emit('getInvitation', invitation.value);
      }
      else {
        error.value = `<strong>Invitation Not Found</strong><br /><br />The invite code <strong><code>${invite_code.value}</code></strong> does not exist.  Double check and make sure the spelling is correct.<br /><br />If you don't know your invite code, reach out to us directly or email us at <a style="text-decoration: underline" href="mailto:${details.value.contact_email}?subject=[Contact] RSVP Help">${details.value.contact_email}</a>.`;
      }
    }
  }

  if ( props.code ) {
    invite_code.value = props.code;
    lookup();
  }

  onMounted(() => {
    if ( input.value ) input.value.focus();
  })
</script>

<template>
  <div>
    <h2>Find Your Invitation</h2>

    <RSVPLoading v-if="looking" 
      loading="Finding Invitation..." 
      :error="error"
      @cancel="looking=false" 
    />

    <div v-else class="flex flex-wrap gap-4 p-8">
      <p><strong>Invite Code:</strong></p>
      <input ref="input" type="text" v-model="invite_code" placeholder="fuzzy-purple-emu" @keyup.enter="lookup" autofocus />
      <button class="btn bg-primary w-full" @click="lookup">Find Invitation</button>
    </div>
  </div>
</template>