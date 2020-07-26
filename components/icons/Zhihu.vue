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
      p-id="1561"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="200"
      height="200"
    >
      <path
        d="M544.949 561.422s0-71.387-34.779-75.05c-34.779-3.663-142.775 0-142.775 0V266.718h161.078s-1.83-73.219-32.949-73.219H233.769l43.93-117.148s-65.897 3.663-89.692 45.761-98.844 252.604-98.844 252.604 25.627 10.983 67.726-20.134c42.101-31.116 56.743-86.033 56.743-86.033l76.879-3.663 1.83 223.316s-133.621-1.83-161.078 0c-27.457 1.83-42.101 75.05-42.101 75.05h203.182s-18.307 124.47-69.557 214.164C169.702 867.108 70.858 938.494 70.858 938.494s71.387 29.287 140.947-10.983c69.557-42.101 120.811-223.316 120.811-223.316l162.912 203.182s14.643-97.013-1.83-124.47c-18.307-27.457-113.49-137.283-113.49-137.283l-42.101 36.607 29.287-120.811h177.552zM587.05 188.01l-1.83 660.793h65.897l23.795 82.37 115.321-82.37h162.912V188.01H587.054z m292.87 587.574h-76.879l-97.013 75.05-21.965-75.05h-20.134V263.057H879.92v512.527z"
        p-id="1562"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Zhihu",
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