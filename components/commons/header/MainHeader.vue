<template>
  <header
    class="w-full h-56 text-white-full text-center bg-center bg-cover relative"
    :class="{ 'md:h-96': currentPath !== 'archive'}"
  >
    <img
      :src="config[currentPath].img"
      alt="head image"
      class="object-cover max-h-full w-full bright-80"
    />
    <div class="absolute inset-0 m-auto h-24 md:h-32">
      <h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">{{ config[currentPath].title }}</h1>
      <h2 class="text-base md:text-lg lg:text-xl font-light">{{ config[currentPath].description }}</h2>
    </div>
  </header>
</template>

<script>
import BLOGCONFIG from "@/data/blog.config";
export default {
  name: "MainHeader",
  data() {
    return {
      currentPath: "index",
      config: BLOGCONFIG,
    };
  },
  watch: {
    "$route.path": function (path) {
      if (path === "/" || path.startsWith("/page")) {
        this.currentPath = "index";
      } else if (path.startsWith("/about")) {
        this.currentPath = "about";
      } else if (path.startsWith("/archive")) {
        this.currentPath = "archive";
      } else {
        this.currentPath = "portfolid";
      }
    },
  },
  created() {
    const path = this.$route.path;
    if (path === "/" || path.startsWith("/page")) {
      this.currentPath = "index";
    } else if (path.startsWith("/about")) {
      this.currentPath = "about";
    } else if (path.startsWith("/archive")) {
      this.currentPath = "archive";
    } else {
      this.currentPath = "portfolid";
    }
  },
};
</script>