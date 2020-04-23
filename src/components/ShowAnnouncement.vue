<template>
  <v-dialog max-width="70%" v-model="dialog" :fullscreen="isMobile" :hide-overlay="isMobile">
    <template #activator="{ on }">
      <v-hover class="pointer" v-slot="{ hover }">
        <v-slide-y-transition>
          <v-card
            v-on="on"
            min-height="150"
            :class="['grey', theme.isDark ? 'darken-3' : 'lighten-4']"
            :elevation="hover ? 4 : 1"
          >
            <v-card-title v-text="title" />
            <v-card-text>{{ content | limit }}</v-card-text>
          </v-card>
        </v-slide-y-transition>
      </v-hover>
    </template>

    <v-card>
      <v-card-title
        :class="['headline grey d-flex justify-center', theme.isDark ? 'darken-3' : 'lighten-2']"
        primary-title
        v-text="title"
        v-if="!isMobile"
      />

      <v-toolbar v-else dark color="primary">
        <v-btn @click="dialog = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title" />
      </v-toolbar>

      <v-card-text style="min-height: 40vh" class="pt-4" v-html="content" />

      <template v-if="!isMobile">
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false" v-text="$t('close')" />
        </v-card-actions>
      </template>
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
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
