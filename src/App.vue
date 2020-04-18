<template>
  <v-app>
    <v-app-bar dark app color="primary">
      <v-toolbar-title>
        <v-btn text rounded to="/">{{ $t('title') }}</v-btn>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
