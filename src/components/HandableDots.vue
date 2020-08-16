<template>
  <div class="dots">
    <span
      class="dots__element"
      :style="{ backgroundColor: theme.isDark ? color.dark : color.light }"
      v-for="i in n"
      :key="i"
    ></span>
  </div>
</template>

<script>
export default {
  inject: ['theme'],
  props: {
    n: {
      type: Number,
      default: 6,
      validator(n) {
        return n > 0;
      },
    },
  },
  data: () => ({
    color: {
      dark: 'rgba(0, 0, 0, .57)',
      light: 'rgba(255, 255, 255, .87)',
    },
  }),
};
</script>

<style lang="scss" scoped></style>
