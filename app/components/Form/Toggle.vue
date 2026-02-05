<script setup>
  const props = defineProps({
    enabled: {
      type: Boolean,
      default: false
    },
    label_no: {
      type: String,
      default: "No"
    },
    label_yes: {
      type: String,
      default: "YES"
    }
  });
  const emit = defineEmits(['toggle']);

  const state = ref(props.enabled);
  watch(state, (newState) => {
    emit('toggle', newState);
  });
</script>

<template>
  <div class="flex gap-2" :data-enabled="state">
    <p :class="{'text-black font-bold': !state, 'text-gray-400 italic': state}" class="cursor-pointer" @click="state = false">{{ label_no }}</p>
    <button type="button" @click="state = !state" :class="{'bg-primary': state, 'bg-gray-200': !state}" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out" role="switch" aria-checked="false">
      <span :class="{'translate-x-5': state, 'translate-x-0': !state}" class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
        <span :class="{'opacity-0 ease-out duration-100': state, 'opacity-100 ease-in duration-200': !state}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span :class="{'opacity-100 ease-in duration-200': state, 'opacity-0 ease-out duration-100': !state}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
          <svg class="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </button>
    <p :class="{'text-primary font-bold': state, 'text-gray-400 italic': !state}" class="cursor-pointer" @click="state = true">{{ label_yes }}</p>
  </div>
</template>