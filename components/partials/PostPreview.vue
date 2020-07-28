<template>
  <div class="px-6 pb-6 border-b post-preview">
    <nuxt-link
      :to="'/post/' + post.meta.title.replace(/ /g, '_') + '/'"
      class="text-cus-black hover:text-cus-blue focus:text-cus-blue hover:no-underline focus:no-underline"
    >
      <h2 class="text-xl font-bold leading-tight mt-8 mb-2 md:text-2xl">{{ post.meta.title }}</h2>
      <h3 class="text-sm leading-tight font-light mb-2 md:text-base">{{ post.meta.subtitle }}</h3>
      <div
        class="text-sm italic break-all break-words text-cus-darker-gray"
      >{{ post.plainText | truncate}}</div>
    </nuxt-link>
    <p
      class="font-serif text-base italic text-cus-darker-gray md:text-lg"
    >Posted by {{ post.meta.author }} on {{post.meta.date | formatDate}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Post } from "@/types/post";

export default defineComponent({
  name: "PostPreview",
  props: {
    post: Object as () => Post,
  },
  filters: {
    truncate(content: string) {
      // truncate content when length > 200
      if (content.length > 200) {
        return content.substring(0, 200) + "...";
      }
      return content;
    },
    formatDate(dateStr: string) {
      const date = new Date(dateStr);
      const monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const year = date.getFullYear();
      const month = monthArr[date.getMonth()];
      const day = date.getDate();

      return month + " " + day + ", " + year;
    },
  },
});
</script>
<style lang="postcss">
.post-preview {
  & > a:hover > div {
    @apply text-cus-blue;
  }

  & > a:focus > div {
    @apply text-cus-blue;
  }
}
</style>