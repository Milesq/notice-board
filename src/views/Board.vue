<template>
  <div class="about pt-8 px-8">
    <h1 class="d-none d-md-flex justify-center">{{ $t('title') }}</h1>
    <v-divider class="my-8 d-none d-md-block" />
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
            <ShowAnnouncement
              :title="item.title"
              :content="item.content"
              :timestamp="{
                created: item.created_at,
                updated: item.updated_at,
              }"
            />
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
import ShowAnnouncement from '../components/ShowAnnouncement.vue';

export default {
  components: {
    ShowAnnouncement,
  },
  data: () => ({
    announcements: [],
    loaded: false,
  }),
  created() {
    this.loadAnnouncements();
    window.firebase
      .analytics()
      .setUserId(
        localStorage.getItem('notice-board-user-name') ||
          (() => console.log('anonyomus-error'), 'anonyomus-error')()
      );
  },
  methods: {
    loadAnnouncements() {
      this.$announcements
        .get()
        .then(({ docs }) => {
          this.announcements = docs.map(item => ({ id: item.id, ...item.data() })).reverse();
          this.loaded = true;
        })
        .catch(err => {
          console.warn('Cannot download data', err);
          setTimeout(this.loadAnnouncements, 300);
        });
    },
  },
};
</script>
