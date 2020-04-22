<template>
  <div class="about pt-8 px-8">
    <h1 class="d-flex justify-center">{{ $t('title') }}</h1>
    <v-divider class="my-8" />
    <v-container width="90%">
      <template v-if="loaded">
        <v-row v-if="announcements.length">
          <v-col
            v-for="(item, i) in announcements"
            :key="`announcement-${i}`"
            cols="12"
            sm="6"
            md="4"
          >
            <v-hover @click="openDetails(i)" class="pointer" v-slot="{ hover }">
              <v-slide-y-transition>
                <v-card
                  min-height="150"
                  :class="['grey', theme.isDark ? 'darken-3' : 'lighten-4']"
                  :elevation="hover ? 4 : 1"
                >
                  <v-card-title>{{ item.title }}</v-card-title>
                  <v-card-text v-html="item.content" />
                </v-card>
              </v-slide-y-transition>
            </v-hover>
          </v-col>
        </v-row>

        <v-row v-else justify="center">{{ $t('noData') }}</v-row>
      </template>
      <v-row v-else>
        <v-col v-for="item in 6" :key="`announcement-skeleton-${item}`" cols="12" :sm="4">
          <v-skeleton-loader type="article" class="elevation-1" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    announcements: [],
    loaded: false,
  }),
  inject: ['theme'],
  created() {
    this.$announcements.get().then(({ docs }) => {
      this.announcements = docs.map(item => ({ id: item.id, ...item.data() }));
      this.loaded = true;
    });
  },
  methods: {
    openDetails(i) {
      console.log(i);
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
