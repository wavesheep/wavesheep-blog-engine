<template>
  <div>
    <BaseTag v-for="tag in tags" :key="tag" :label="tag" :mode="mode" class="mr-2 mt-2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import BaseTag from "@/components/partials/tag/BaseTag.vue";

export default defineComponent({
  name: "BaseTagList",
  components: {
    BaseTag,
  },
  props: {
    tags: null,
    mode: {
      validator: (value: string) => {
        return ["light", "dark"].indexOf(value) !== -1;
      },
      default: "dark",
    },
  },
});
</script>
<style lang="postcss" scoped>
</style>