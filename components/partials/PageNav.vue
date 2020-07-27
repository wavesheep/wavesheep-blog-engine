<template>
  <div
    class="page-nav font-extrabold leading-relaxed text-sm uppercase tracking-wider py-4 overflow-auto"
  >
    <nuxt-link :to="prev" class="float-left" v-if="!!prev">&larr; Newer Posts</nuxt-link>
    <nuxt-link :to="next" class="float-right" v-if="!!next">Older Posts &rarr;</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "PageNav",
  props: {
    prev: String,
    next: String,
  },
});
</script>
<style lang="postcss">
.page-nav > a {
  @apply block p-3 border text-cus-black shadow-none;
  max-width: 45%;
  &:hover,
  &:focus {
    @apply text-white-full bg-cus-darker-blue border-cus-darker-blue;
  }
}
</style>