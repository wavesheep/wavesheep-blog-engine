<template>
  <div>
    <div
      class="mx-auto w-full md:w-8/12 xl:w-1/2 md:flex md:flex-initial md:flex-row md:justify-between"
    >
      <div class="w-full md:w-9/12">
        <PostPreview v-for="post in posts" :key="post.meta.title" :post="post" />
        <PageNav :next="nextPage" />
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
import BaseTagList from "@/components/partials/BaseTagList.vue";
import { Post } from "@/types/post";

export default defineComponent({
  components: {
    PostPreview,
    PageNav,
  },
  asyncData() {
    if (process.server) {
      const data = require("../utils/data");
      const posts: Post[] = (data.getData() as Post[]).filter(
        (p) => p.filename !== "about.md" && p.filename !== "portfolid.md"
      );
      let tags = new Set<string>();
      posts.forEach((post) => {
        post.meta.tags?.forEach((tag) => {
          tags.add(tag);
        });
      });
      return {
        posts: posts.slice(0, 5),
        nextPage: posts[5] ? "/page/2" : "",
        tags,
      };
    }
  },
});
</script>
<style lang="postcss">
.index-tag-list > a {
  font-size: 12px;
}

.index-tag-list > a > div {
  @apply border-cus-dark-gray text-cus-dark-gray font-medium;
}

.index-tag-list > a:hover > div {
  @apply bg-transparent border-cus-blue text-cus-blue;
}
</style>