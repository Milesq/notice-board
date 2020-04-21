<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="8" md="4">
        <v-card>
          <v-card-title>{{ $t('typeName') }}</v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">
              <v-progress-circular indeterminate :color="loadingType" v-if="loading" />
            </div>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="name" :label="$t('nameAndSurname')" />
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn type="submit" color="primary">ok</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar">
      {{ $t('incorrectData') }}
      <v-btn color="pink" text @click="closeSnackbar">{{ $t('close') }}</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import config from '../../config.json';

export default {
  data: () => ({
    name: '',
    loading: false,
    loadingType: 'primary',
    snackbar: false,
  }),
  methods: {
    async submit() {
      this.loading = true;
      const { token } = await fetch(`${config.firebaseAPI}/checkUserName`, {
        method: 'POST',
        body: JSON.stringify({ name: this.name }),
      }).then(resp => resp.json());

      if (token == '') {
        this.loadingType = 'error';
        this.snackbar = true;
        return;
      }

      await window.firebase.auth().signInWithCustomToken(token);
      this.loading = false;
      this.$router.push('/');
    },
    closeSnackbar() {
      this.snackbar = false;
    },
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.loading = false;
        this.loadingType = 'primary';
      }
    },
  },
};
</script>
