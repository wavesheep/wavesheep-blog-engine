<template>
  <a :href="url" target="_blank" class="shadow-none hover:shadow-none inline-block">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'LinkAccount',
  props: {
    url: String
  }
}
</script>