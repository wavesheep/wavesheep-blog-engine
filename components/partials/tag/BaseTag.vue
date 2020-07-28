<template>
  <NLink :to="'/archive/?tag='+label" class="shadow-none hover:shadow-none inline-block">
    <div
      class="border rounded-full px-3 py-1 cursor-pointer text-sm bg-transparent"
      :class="{
        'border-white-800': mode == 'light',
        'hover:bg-white-400': mode == 'light',
        'text-white-full': mode == 'light',
        'border-cus-black': mode == 'dark',
        'hover:bg-black-100': mode == 'dark',
        'text-cus-black': mode == 'dark'
      }"
    >{{ label }}</div>
  </NLink>
</template>

<script>
export default {
  name: "BaseTag",
  props: {
    mode: {
      validator: (value) => {
        return ['light', 'dark'].indexOf(value) !== -1
      },
      default: 'dark'
    },
    label: String
  }
};
</script>