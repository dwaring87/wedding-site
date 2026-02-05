<script setup>
  const details = await useAPI().get('/details');
  if ( !details.value.rsvp_enabled ) navigateTo('/')

  useHead({ title: 'RSVP' });
  const loaded = ref(false);
  const code = ref();
  const invitation = ref();

  // When we get an invitation, set the invitation object and URL param
  const onGetInvitation = (i) => {
    invitation.value = i;
    history.replaceState(history.state, null, `?invite=${i.invite_code}`);
    window.scrollTo(0, 0);
    useHead({ title: `RSVP - ${i.name}` });
  }

  // When we cancel editing an invitation, clear the invitation object and URL param
  const onCancel = () => {
    invitation.value = undefined;
    code.value = undefined;
    history.replaceState(history.state, null, '?');
    window.scrollTo(0, 0);
    useHead({ title: "RSVP" });
  }
  
  // When the page is loaded, check for a URL param and set the invite code if present
  onMounted(async () => {
    let urlParams = new URLSearchParams(window.location.search);
    if ( urlParams.has('invite') ) {
      code.value = urlParams.get('invite');
    }
    loaded.value = true;
  });
</script>

<template>
  <div class="page">

    <!-- RSVPs OPEN -->
    <div v-if="details.rsvp_open" class="relative bg-white border-2 border-gray-100 rounded-md shadow-xl">
      <div class="grid grid-cols-1 lg:grid-cols-3">

        <!-- RSVP INSTRUCTIONS -->
        <RSVPInstructions :invitationFound="!!invitation" class="relative overflow-hidden" />
        
        <!-- RSVP EDIT OR LOOKUP -->
        <div v-if="loaded" class="py-4 px-4 md:px-8 sm:px-10 lg:col-span-2 xl:px-12">
          <RSVPEdit v-if="invitation" :invitation="invitation" @cancel="onCancel" />
          <RSVPLookup v-else :code="code" @getInvitation="onGetInvitation" />
        </div>

      </div>
    </div>

    <!-- RSVPs CLOSED -->
    <RSVPClosed v-else />

  </div>
</template>