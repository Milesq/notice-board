<template>
  <v-app>
    <v-app-bar dark app color="primary">
      <!-- <v-toolbar-title> -->
      <v-btn text rounded to="/">{{ $t('title') }}</v-btn>
      <v-spacer />
      <v-btn @click="changeTheme" text fab dark>
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
      <!-- </v-toolbar-title> -->
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark);
    },
  },
};
</script>
