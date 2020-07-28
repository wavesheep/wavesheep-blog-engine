<template>
  <NLink :to="'/archive/?tag='+options.label" class="shadow-none hover:shadow-none inline-block">
    <div
      @mouseover.self="handleMouseOver"
      @mouseout.self="handleMouseOut"
      class="px-3 py-1 inline-block cursor-pointer rounded-full text-white-full text-sm transition-all duration-300 ease-linear my-2 mr-2"
      :class="{'shadow-box': options.focus}"
      :style="{ backgroundColor: options.focus ? options.highlightColor : options.baseColor }"
    >
      {{ options.label }}
      <sup
        @mouseover.self="handleMouseOverChild"
        @mouseout.self="handleMouseOutChild"
        v-if="options.num != 0"
      >{{ options.num }}</sup>
    </div>
  </NLink>
</template>

<script>
export default {
  name: "ColoredTag",
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          focus: false,
          label: "",
          baseColor: "",
          highlightColor: "",
          num: 0,
        };
      },
    },
  },
  methods: {
    handleMouseOver(ev) {
      ev.target.style.backgroundColor = this.options.highlightColor;
    },
    handleMouseOut(ev) {
      if (!this.options.focus)
        ev.target.style.backgroundColor = this.options.baseColor;
    },
    handleMouseOverChild(ev) {
      ev.target.parentElement.style.backgroundColor = this.options.highlightColor;
    },
    handleMouseOutChild(ev) {
      if (!this.options.focus)
        ev.target.parentElement.style.backgroundColor = this.options.baseColor;
    },
  },
};
</script>