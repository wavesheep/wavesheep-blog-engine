<template>
  <div>
    <PostHeader :post="post" />
    <div
      class="mx-auto w-full md:w-10/12 lg:w-8/12 p-8 lg:flex lg:flex-initial lg:flex-row lg:justify-between"
    >
      <div class="w-full p-8 box-border lg:w-10/12">
        <article v-html="post.html" class="w-full" />
        <PostNav :prev="prev.replace(/ /g, '_')" :next="next.replace(/ /g, '_')" class="w-full" />
        <ClientOnly>
          <div class="w-full mt-8">
            <Vssue :title="post.meta.title" />
          </div>
        </ClientOnly>
      </div>
      <Catalog class="hidden box-border lg:block lg:w-2/12" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Post } from "@/types/post";
import PostHeader from "@/components/commons/header/PostHeader.vue";
import PostNav from "@/components/partials/PostNav.vue";
import Catalog from "@/components/partials/Catalog.vue";

export default defineComponent({
  layout: "post",
  components: {
    PostHeader,
    PostNav,
    Catalog,
  },
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
      const data = require("../../../utils/data");
      const posts: Post[] = (data.getData() as Post[]).filter(
        (p) => p.filename !== "about.md" && p.filename !== "portfolid.md"
      );
      let index = 0;
      let post = null;
      posts.forEach((p, i) => {
        if (p.meta?.title?.replace(/ /g, '_') === route.params.title) {
          index = i;
          post = p;
        }
      });
      return {
        post,
        prev: !!posts[index + 1] ? posts[index + 1].meta.title : "",
        next: !!posts[index - 1] ? posts[index - 1].meta.title : "",
      };
    }
  },
  created() {
    if (!(this.post as Post).meta.background) {
      (this.$parent.$parent as any).mode = "light";
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/css/article.scss";
</style>