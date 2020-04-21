<template>
  <v-card>
    <v-card-title>{{ $t('manageAnnouncements') }}</v-card-title>
    <v-card-text>
      <v-list subheader three-line v-if="announcements.length">
        <EditableAnnouncement
          v-for="(el, idx) in announcements"
          v-model="announcements[idx]"
          :key="el.title + idx"
        >
          <v-list-item class="announcement" v-on:click.prevent>
            <v-list-item-content>
              <v-list-item-title v-html="el.title" />
              <v-list-item-subtitle v-html="el.content" />
            </v-list-item-content>
          </v-list-item>
        </EditableAnnouncement>
      </v-list>

      <v-list v-else>
        <v-skeleton-loader
          loading
          type="list-item"
          v-for="(el, i) in Array(4).fill({ name: '' })"
          :key="i"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import EditableAnnouncement from './EditableAnnouncement.vue';

export default {
  data: () => ({
    announcements: [],
  }),
  methods: {
    async readData() {
      return (await this.$announcements.get()).docs.map(
        el => el.exists && { ...el.data(), id: el.id }
      );
    },
  },
  created() {
    this.readData().then(announcements => {
      this.announcements = announcements;
    });
  },
  components: {
    EditableAnnouncement,
  },
};
</script>
