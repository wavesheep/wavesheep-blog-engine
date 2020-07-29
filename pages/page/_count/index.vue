<template>
  <div>
    <div
      class="mx-auto w-full md:w-8/12 xl:w-1/2 md:flex md:flex-initial md:flex-row md:justify-between"
    >
      <div class="w-full md:w-9/12">
        <PostPreview v-for="post in posts" :key="post.meta.title" :post="post" />
        <PageNav :next="nextPage" :prev="prevPage" />
        <div class="block md:hidden px-8">
          <nuxt-link
            to="/archive"
            class="font-bold hover:text-cus-blue text-cus-dark-gray text-sm"
          >FEATURED TAGS</nuxt-link>
          <BaseTagList :tags="tags" class="index-tag-list" />
        </div>
      </div>
      <div class="hidden mt-8 md:block md:w-3/12">
        <nuxt-link
          to="/archive"
          class="font-bold hover:text-cus-blue text-cus-dark-gray text-sm"
        >FEATURED TAGS</nuxt-link>
        <BaseTagList :tags="tags" class="index-tag-list" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import PostPreview from "@/components/partials/PostPreview.vue";
import PageNav from "@/components/partials/PageNav.vue";
import { Post } from "@/types/post";

export default defineComponent({
  components: {
    PostPreview,
    PageNav,
  },
  asyncData({ route }) {
    if (process.server) {
      const data = require("../../../utils/data");
      const posts: Post[] = (data.getData() as Post[]).filter(
        (p) => p.filename !== "about.md" && p.filename !== "portfolid.md"
      );
      const count = Number.parseInt(route.params.count);
      let tags = new Set<string>();
      posts.forEach((post) => {
        post.meta.tags?.forEach((tag) => {
          tags.add(tag);
        });
      });
      return {
        posts: posts.slice((count - 1) * 5, count * 5),
        nextPage: posts[count * 5] ? "/page/" + (count + 1) : "",
        prevPage: count === 2 ? "/" : "/page/" + (count - 1),
        tags
      };
    }
  },
});
</script>