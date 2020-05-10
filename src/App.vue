<template>
  <v-app>
    <v-app-bar dark app color="primary">
      <v-btn text rounded to="/" class="d-md-none">{{ $t('title') }}</v-btn>

      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn v-on="on" class="d-none d-md-inline-flex" text fab dark to="/">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('home') }}</span>
      </v-tooltip>
      <v-spacer />

      <v-menu offset-y :open-on-hover="$vuetify.breakpoint.mdAndUp">
        <template #activator="{ on }">
          <v-btn v-on="on" text fab dark>
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(locale, idx) in locales" :key="idx" @click="changeLocale(locale)">
            <v-list-item-title>{{ locale.toLocaleUpperCase() }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn @click="changeTheme" v-on="on" text fab dark>
            <v-icon>mdi-brightness-6</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('changeTheme') }}</span>
      </v-tooltip>

      <v-tooltip bottom v-if="loggedIn">
        <template #activator="{ on }">
          <v-btn @click="logout" v-on="on" text fab dark>
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('logout') }}</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loggedIn: false,
  }),
  computed: {
    locales() {
      return Object.keys(this.$i18n.messages);
    },
  },
  created() {
    window.firebase.auth().onAuthStateChanged(user => {
      this.loggedIn = !!user;
    });
  },
  methods: {
    changeLocale(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('darkTheme', this.$vuetify.theme.dark);
    },
    logout() {
      window.firebase.auth().signOut();
      location.reload();
    },
  },
};
</script>
