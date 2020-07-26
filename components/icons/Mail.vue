<template>
  <div class="relative w-16 h-16 group">
    <svg
      class="absolute w-16 h-16 group-hover:fill-cus-blue"
      :class="{'fill-black-full': mode == 'dark', 'fill-black-400': mode == 'light'}"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7412"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="200"
      height="200"
    >
      <path
        d="M512 512m-440.32 0a440.32 440.32 0 1 0 880.64 0 440.32 440.32 0 1 0-880.64 0Z"
        p-id="7413"
      />
    </svg>
    <svg
      class="absolute w-8 h-8 inset-0 m-auto"
      :class="{'fill-white-full': mode == 'dark', 'fill-white-800': mode == 'light'}"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1799"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="200"
      height="200"
    >
      <path
        d="M145.37 155.6h733.259c50.023 0 91.044 39.486 91.657 88.077L512.204 492.461 54.122 243.881c0.511-48.693 41.123-88.282 91.248-88.282zM54.122 339.119L53.713 779.3c0 49 41.225 89.1 91.657 89.1h733.259c50.432 0 91.657-40.1 91.657-89.1V338.915L522.945 576.14c-6.854 3.58-15.14 3.58-21.994 0L54.121 339.12z"
        p-id="1800"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Mail",
  props: {
    mode: {
      validator: value => {
        return ["light", "dark"].indexOf(value) !== -1;
      },
      default: "dark"
    }
  }
};
</script>