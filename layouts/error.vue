<template>
  <div
    class="h-screen w-screen relative bg-cover bg-center"
    :style="{background: 'url(' + img + ')'}"
  >
    <Nav mode="dark" />
    <div class="absolute inset-0 m-auto h-32 w-full text-center text-white-full">
      <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{{error.statusCode}}</h1>
      <h2 class="text-base md:text-lg lg:text-xl xl:text-2xl">{{description}}</h2>
    </div>
    <Footer mode="light" class="absolute bottom-0 w-full text-center" />
  </div>
</template>

<script>
import BLOGCONFIG from "@/data/blog.config";

export default {
  layout: "blank",
  props: ["error"],
  data() {
    return {
      img: "",
      description: "",
    };
  },
  created() {
    this.img = BLOGCONFIG.error.img;
    this.description = BLOGCONFIG.error.description;
  },
};
</script>
