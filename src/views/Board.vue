<template>
  <div class="about pt-8 px-8">
    <h1 class="d-flex justify-center">{{ $t('title') }}</h1>
    <v-divider class="my-8" />
    <v-container width="90%">
      <v-row>
        <v-col
          v-for="(item, i) in announcements"
          :key="`announcement-${i}`"
          :cols="cols(item.title.length)"
        >
          <v-hover v-slot="{ hover }">
            <v-slide-y-transition>
              <v-card min-height="150" :elevation="hover ? 8 : 2">
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-subtitle v-html="item.content"></v-card-subtitle>
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
const possibilities = [
  [3, 3, 3, 3],
  [4, 4, 4],
  [6, 6],
  [8, 4],
  [4, 8],
  [12]
];

let fillingSystem = [];

export default {
  data: () => ({
    announcements: [],
  }),
  created() {
    this.$announcements.get().then(({ docs }) => {
      this.announcements = docs.map(item => ({ id: item.id, ...item.data() }));
    });
  },
  methods: {
    cols(x) {
      if (fillingSystem.length === 0) {
        fillingSystem = possibilities[x % possibilities.length];
      }

      return fillingSystem.pop();
    },
  },
};
</script>
