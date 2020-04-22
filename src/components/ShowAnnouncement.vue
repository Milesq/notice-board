<template>
  <v-dialog max-width="55%" v-model="dialog">
    <template #activator="{ on }">
      <v-hover class="pointer" v-slot="{ hover }">
        <v-slide-y-transition>
          <v-card
            v-on="on"
            min-height="150"
            :class="['grey', theme.isDark ? 'darken-3' : 'lighten-4']"
            :elevation="hover ? 4 : 1"
          >
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>{{ content | limit }}</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-hover>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{ title }}</v-card-title>

      <v-card-text class="pt-4" v-html="content" />

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inject: ['theme'],
  props: {
    title: {
      type: String,
      default: () => '',
    },
    content: {
      type: String,
      default: () => '',
    },
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
