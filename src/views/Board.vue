<template>
  <div class="about pt-8 px-8">
    <h1 class="d-flex justify-center">{{ $t('title') }}</h1>
    <v-divider class="my-8" />
    <v-container width="90%">
      <v-row>
        <v-col
          v-for="(item, i) in announcements"
          :key="`announcement-${i}`"
          cols="12"
          :sm="cols(item.title.length)"
        >
          <v-hover v-slot="{ hover }">
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
    </v-container>
  </div>
</template>

<script>
// prettier-ignore
let possibilities = [
  [3, 3, 3, 3],
  [4, 4, 4],
  [6, 6],
  [8, 4],
  [4, 8],
  [12],
];

let fillingSystem = [];

export default {
  data: () => ({
    announcements: [],
  }),
  inject: ['theme'],
  created() {
    fillingSystem = [];
    this.$announcements.get().then(({ docs }) => {
      this.announcements = docs.map(item => ({ id: item.id, ...item.data() }));
    });

    if (this.$vuetify.breakpoint.sm) {
      // prettier-ignore
      possibilities = [
        [8, 4],
        [12],
        [6, 6],
      ];
    }
  },
  methods: {
    cols(x) {
      if (fillingSystem.length === 0) {
        fillingSystem = Array.from(possibilities[x % possibilities.length]);
      }

      return fillingSystem.pop();
    },
  },
};
</script>
