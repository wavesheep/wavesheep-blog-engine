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
      class="absolute w-10 h-10 inset-0 m-auto"
      :class="{'fill-white-full': mode == 'dark', 'fill-white-800': mode == 'light'}"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1364"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="200"
      height="200"
    >
      <path
        d="M896 273.824a314.56 314.56 0 0 1-90.496 24.8 157.952 157.952 0 0 0 69.28-87.168 315.648 315.648 0 0 1-100.064 38.24 157.6 157.6 0 0 0-268.512 143.712A447.36 447.36 0 0 1 181.44 228.768a157.056 157.056 0 0 0-21.312 79.232c0 54.656 27.808 102.88 70.08 131.136a157.024 157.024 0 0 1-71.36-19.712v1.984a157.632 157.632 0 0 0 126.4 154.496 157.12 157.12 0 0 1-71.168 2.72 157.76 157.76 0 0 0 147.2 109.44 316.032 316.032 0 0 1-195.68 67.456c-12.704 0-25.248-0.736-37.6-2.208a445.984 445.984 0 0 0 241.536 70.784c289.824 0 448.288-240.096 448.288-448.32 0-6.816-0.16-13.632-0.448-20.384A320.8 320.8 0 0 0 896 273.824z"
        p-id="1365"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Twitter",
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