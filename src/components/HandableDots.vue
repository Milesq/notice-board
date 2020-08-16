<template>
  <div></div>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      default: 6,
      validator(n) {
        return n > 0;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
