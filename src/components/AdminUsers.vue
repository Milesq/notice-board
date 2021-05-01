<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" @submit.prevent="savePass" class="d-flex align-center mb-1">
        <v-text-field v-model="pass" :label="$t('nameAndSurname')" />
        <v-btn type="submit" class="ma-2" tile outlined color="primary">
          <v-icon left>mdi-check</v-icon>
          {{ $t('save') }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      pass: '',
    };
  },
  async created() {
    this.pass = await this.readPass();
  },
  methods: {
    async readPass() {
      const pass = await this.$users.doc('pass').get();
      const { name } = pass.data();

      return name;
    },
    savePass() {
      this.$users.doc('pass').set({
        name: this.pass,
      });
    },
  },
};
</script>
