<template>
    <div class="p-4 sm:p-8 md:p-12">
      <div class="w-full text-center mt-12 mb-20">
        <Icon name="ri:error-warning-line" class="text-gray-400 w-[56px] h-[56px]" />
      </div>
      <div class="max-w-lg mx-auto p-8 bg-amber-400 border-2 border-amber-800 rounded-md shadow-md">
        <h1 class="font-semibold text-xl flex items-center gap-2">
          <Icon name="ri:network-error-line" class="w-[32px] h-[32px]" />
          <span>NETWORK ERROR</span>
        </h1>
        <p class="mt-4">The wesbite is unable to contact the CMS database at this time.</p>
        <p class="mt-4">Please try again later.</p>
      </div>
    </div>
</template>