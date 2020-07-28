<template>
  <div>
    <div
      class="mx-auto w-full md:w-10/12 lg:w-8/12 p-8 lg:flex lg:flex-initial lg:flex-row lg:justify-between"
    >
      <div class="w-full p-8 box-border">
        <article v-html="portfolid.html" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Post } from "@/types/post";

export default defineComponent({
  head: {
    link: [
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/atom-one-dark.min.css",
      },
    ],
    script: [
      {
        async: true,
        src: "//cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
      },
    ],
  },
  asyncData({ route }) {
    if (process.server) {
      const data = require("../utils/data");
      const posts: Post[] = (data.getData() as Post[]).filter(
        (p) => p.filename === "portfolid.md"
      );
      return {
        portfolid: posts[0],
      };
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/css/article.scss";
</style>