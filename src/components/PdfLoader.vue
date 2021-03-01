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
    <div v-if="pdf">
      <pdf v-for="i in numPages" :key="i" :src="pdf" :page="i"></pdf>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
  components: {
    pdf,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isContentLoaded: false,
    numPages: 0,
    pdf: null,
  }),
  async mounted() {
    this.pdf = pdf.createLoadingTask(this.src);
    this.numPages = (await this.pdf.promise).numPages;
    this.isContentLoaded = true;
  },
};
</script>
