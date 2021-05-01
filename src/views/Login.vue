<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col sm="8" md="4">
          <v-card>
            <v-card-title>{{ $t('typeName') }}</v-card-title>
            <v-card-text>
              <div class="d-flex justify-center">
                <v-progress-circular indeterminate :color="loadingType" v-if="loading" />
              </div>
              <v-form ref="form" @submit.prevent="submit">
                <v-text-field v-model="name" type="password" :label="$t('nameAndSurname')" />
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
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      loading: false,
      loadingType: 'primary',
      snackbar: false,
    };
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.loading = false;
        this.loadingType = 'primary';
      }
    },
  },
  created() {
    if (window.firebase.auth().currentUser !== null) {
      this.$router.push('/');
    }
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      const checkUserName = window.firebase.functions().httpsCallable('checkUserName');
      const {
        data: { token },
      } = await checkUserName({ name: this.name });

      if (token == '') {
        this.loadingType = 'error';
        this.snackbar = true;
        return;
      }

      localStorage.setItem('notice-board-user-name', this.name);
      await window.firebase.auth().signInWithCustomToken(token);
      this.loading = false;
      this.$router.push('/');
    },
    closeSnackbar() {
      this.snackbar = false;
    },
  },
};
</script>
