<script setup>
  const recs = await useAPI().get('/recommendations');

  const scroll = (id) => {
    const offsets = document.getElementById(id).getBoundingClientRect();
    window.scrollBy({
      top: offsets.top-70,
      left: 0,
      behavior: 'smooth'
    });
    history.replaceState(history.state, null, `#${id}`);
  }
</script>

<template>
  <div>

    <!-- Recommendations section -->
    <div v-if="recs && recs.recommendations && recs.recommendations.length > 0" id="toc">

      <!-- Category Index -->
      <div v-if="recs.recommendations.length > 10" class="well mt-8">
        <h4 class="mb-2">Jump to Category:</h4>
        <div class="inline sm:flex flex-wrap gap-x-2 justify-between">
          <span v-for="category in recs.categories" class="block my-3 bg-primary rounded-md px-2 cursor-pointer w-fit" @click="scroll(category)">
            {{ category }}
          </span>
        </div>
      </div>

      <!-- Category Section -->
      <div v-for="category in recs.categories">

        <!-- Category Header -->
        <Icon name="ri:arrow-up-s-line" class="bg-gray-400 rounded-md translate-y-1 cursor-pointer float-right w-[24px] h-[24px]" @click="scroll('toc')" />
        <h2 :id="category" class="text-primary">{{ category }}</h2>

        <!-- Recommendation Card -->
        <Card v-for="(rec) in recs.recommendations.filter((e) => e.category.name === category)" :title="rec.name" class="recommendation">
          <div class="flex flex-wrap md:flex-nowrap gap-4">
            <div class="w-fit">
              <p v-if="rec.location">
                <strong>Location:</strong>&nbsp;
                <a :href="`https://www.google.com/maps/search/?api=1&query=${rec.location}`" target="_blank">{{ rec.location }}</a>
              </p>
              <p v-if="rec.website && rec.website.length > 0">
                <strong>Website:</strong>&nbsp;
                <span v-for="(w, i) in rec.website" class="inline-block">
                  <span v-if="i !== 0">&ensp;&bull;&ensp;</span>
                  <a :href="w.url" target="_blank" class="underline text-primary opacity-90 hover:opacity-100">{{ w.title }}</a>
                </span>
              </p>
              <br />
              <p>{{ rec.description }}</p>
            </div>
            <div class="mx-auto my-auto">
              <Photo :dId="rec.image" class="mx-auto w-max max-h-42 md:max-h-48 lg:max-h-60 lg:max-w-60 rounded-md shadow-md" style="margin-top: 0px; margin-bottom: 0px;" width="400" />
            </div>
          </div>
        </Card>

      </div>

    </div>

    <!-- Loading -->
    <div v-else class="text-center">
      <p class="lead">Loading...</p>
    </div>

  </div>
</template>

<style scoped>
  .recommendation p {
    margin: 0px;
  }
</style>