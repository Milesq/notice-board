<template>
  <div>
    <div class="d-flex justify-center">
      <v-progress-circular
        v-if="!isContentLoaded"
        :size="70"
        :width="8"
        indeterminate
        color="primary"
      />
    </div>
    <pdf @loaded="loaded" v-bind="$attrs" />
  </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
  components: {
    pdf,
  },
  data: () => ({
    isContentLoaded: false,
  }),
  methods: {
    loaded() {
      this.isContentLoaded = true;
    },
  },
};
</script>
