<template>
  <v-app>
    <v-app-bar dark app color="primary">
      <v-toolbar-title>
        <v-btn text rounded to="/">Ogłoszenia</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text rounded to="/admin">Admin</v-btn>
      <v-btn text rounded to="/board">Tablica Ogłoszeń</v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>
