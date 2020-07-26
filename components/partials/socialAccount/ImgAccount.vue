<template>
  <div 
    class="relative cursor-pointer" 
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <slot />
    <div class="bubble" v-show="isAlwaysShow || isShow">
      <img :src="url" class="object-fill" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgAccount',
  props: {
    url: String
  },
  data() {
    return {
      isAlwaysShow: false,
      isShow: false
    }
  },
  methods: {
    handleClick() {
      this.isAlwaysShow = !this.isAlwaysShow;
      this.isShow = !this.isShow;
    },
    handleMouseOver() {
      this.isShow = true;
    },
    handleMouseOut() {
      this.isShow = false;
    }
  }
}
</script>

<style scoped>
.bubble {
  position: absolute;
  height: 12rem;
  width: 12rem;
  left: -4rem;
  top: -13rem;
  padding: .5rem;
  background-color: rgba(0, 0, 0, .05);
}

.bubble::before {
  content: '';
  position: absolute;
  display: block;
  height: 0;
  width: 0;
  bottom: -1rem;
  left: 5rem;
  border-color: transparent;
  border-width: 1rem 1rem 0;
  border-top: 1rem solid rgba(0, 0, 0, .05);
}
</style>