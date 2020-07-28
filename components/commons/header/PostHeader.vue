<template>
  <header
    class="w-full h-96 text-white-full text-center relative md:h-96 post-header"
    :class="{
      'text-cus-black': !post.meta.background
    }"
  >
    <img
      :src="post.meta.background"
      alt="post head image"
      class="object-cover max-h-full w-full bright-80"
      v-if="!!post.meta.background"
    />
    <div class="absolute inset-0 m-auto h-32 md:h-40 w-8/12">
      <BaseTagList
        :tags="post.meta.tags"
        :mode="!!post.meta.background ? 'light' : 'dark'"
        v-if="!!post.meta.tags"
      />
      <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{{ post.meta.title }}</h1>
      <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">{{ post.meta.subtitle }}</h2>
      <p
        class="font-serif text-base italic md:text-lg lg:text-xl xl:text-2xl"
      >Posted by {{ post.meta.author }} on {{post.meta.date | formatDate}}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Post } from "@/types/post";

export default defineComponent({
  name: "PostHeader",
  props: {
    post: Object as () => Post[],
  },
  filters: {
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
.post-header {
  min-height: 14rem;
}
</style>