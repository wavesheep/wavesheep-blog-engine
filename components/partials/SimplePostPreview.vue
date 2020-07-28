<template>
  <div class="border-b p-4">
    <nuxt-link :to="url" class="text-cus-black hover:text-cus-blue">
      <h1 class="text-base md:text-lg font-medium leading-relaxed">{{ title }}</h1>
      <h2 class="text-sm md:text-base">{{ subtitle }}</h2>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    url: String,
  },
};
</script>