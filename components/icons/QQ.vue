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
      p-id="1569"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="200"
      height="200"
    >
      <path
        d="M512 188.384c194.72 0 204.608 173.984 215.424 208.224 0 0 15.296 17.12 18.944 43.264 2.336 16.864-7.2 36.064-7.2 36.064s62.208 83.84 62.208 149.632c0 41.184-12.16 62.4-26.304 62.4-14.144 0-35.008-43.456-35.008-43.456s-32.448 69.408-48.672 79.328c-16.224 9.92 58.592 20.736 58.592 53.184 0 32.448-59.488 46.88-108.16 46.88s-126.208-25.248-126.208-25.248l-27.936-0.896s-21.632 30.656-110.88 30.656c-89.248 0-128-24.352-128-53.184 0-38.88 56.8-44.16 56.8-44.16s-36.224-10.016-66.912-95.808c0 0-21.248 46.24-51.2 46.24 0 0-12.608-7.488-12.608-49.568 0-87.2 62.56-129.664 89.6-155.808 0 0-4.512-11.424-2.112-25.504 2.688-15.808 11.968-25.248 11.968-25.248s-3.456-18.88 9.632-34.112c2.688-42.432 33.312-202.88 228.032-202.88m0-64c-204.768 0-277.376 146.816-290.24 245.376-6.144 11.968-9.6 24.32-11.072 36a116.544 116.544 0 0 0-12.704 44.224c-35.52 32.672-87.136 88.32-87.136 181.92 0 64.928 23.904 92.736 43.968 104.64l15.104 8.96H189.088a100.416 100.416 0 0 0-4.32 29.76c0 27.488 13.856 117.184 192 117.184 65.184 0 105.984-14.048 131.008-29.152 26.272 7.872 87.616 24.64 134.016 24.64 104.576 0 172.16-43.52 172.16-110.88 0-12.032-2.272-22.72-6.144-32.16 30.784-14.048 57.504-50.112 57.504-119.264 0-60.672-33.504-124.256-56.288-160.512a112.96 112.96 0 0 0 0.704-33.984 154.464 154.464 0 0 0-23.072-61.664 193.92 193.92 0 0 1-0.768-3.776C752.32 205.536 660.16 124.384 512 124.384z"
        p-id="1570"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "QQ",
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