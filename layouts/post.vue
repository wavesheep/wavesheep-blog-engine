<template>
  <div>
    <Nav :mode="mode" />
    <main>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      mode: "dark",
    };
  },
});
</script>