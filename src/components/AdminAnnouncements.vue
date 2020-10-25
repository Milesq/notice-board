<template>
  <v-card>
    <v-card-title>
      <span>{{ $t('manageAnnouncements') }}</span>
      <v-spacer />
      <EditableAnnouncement @save="createNew">
        <v-btn color="primary">{{ $t('addAnnouncement') }}</v-btn>
      </EditableAnnouncement>
    </v-card-title>
    <v-card-text>
      <template v-if="loaded">
        <v-list subheader three-line v-if="announcements.length">
          <Draggable ghost-class="ghost" v-model="announcements" @end="updatePosition">
            <!-- div cannot be removed
              see https://github.com/SortableJS/Vue.Draggable/issues/647
            -->
            <div v-for="(el, idx) in announcements" :key="idx">
              <EditableAnnouncement
                pass-opener
                :value="announcements[idx]"
                @save="update(idx, $event)"
              >
                <template v-slot="{ open }">
                  <div class="handler"></div>

                  <v-list-item class="announcement" v-on:click.prevent>
                    <v-list-item-content v-on="open">
                      <v-list-item-title v-html="el.title" />
                      <v-list-item-subtitle>{{ el.content | limit }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="error"
                        @click="deleteAnnouncement(el)"
                      >
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </EditableAnnouncement>
            </div>
          </Draggable>
        </v-list>

        <span v-else>{{ $t('noData') }}</span>
      </template>

      <v-list v-else>
        <v-skeleton-loader
          loading
          type="list-item-two-line"
          v-for="(el, i) in Array(4).fill({ name: '' })"
          :key="i"
        />
      </v-list>
    </v-card-text>

    <v-snackbar left v-model="snackbarSaved">
      {{ $t('saved') }}
      <v-btn text @click="snackbarSaved = false">{{ $t('close') }}</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import Draggable from 'vuedraggable';
import EditableAnnouncement from './EditableAnnouncement.vue';

async function sendNotification(notification) {
  const myToken = window.firebase.auth().currentUser.getIdToken();

  const { key } = await fetch(`${process.env.VUE_APP_firebaseAPI}/getServerKey`, {
    headers: {
      Authorization: `Bearer ${await myToken}`,
    },
  }).then(r => r.json());

  return fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: '/topics/newAnnouncement',
      notification,
    }),
  });
}

export default {
  components: {
    EditableAnnouncement,
    Draggable,
  },
  data: () => ({
    announcements: [],
    snackbarSaved: false,
    loaded: false,
  }),
  created() {
    this.readData().then(announcements => {
      this.loaded = true;
      this.announcements = announcements;
    });
  },
  methods: {
    createNew(announcement) {
      this.snackbarSaved = true;

      const url = new URL(process.env.VUE_APP_host);
      url.searchParams.append('notice', announcement.title);

      sendNotification({
        title: 'Nowe Ogłoszenie',
        body: announcement.title,
        click_action: url.href,
      });

      const newDoc = this.$announcements.doc();
      this.announcements = [
        {
          id: newDoc.id,
          ...announcement,
        },
        ...this.announcements,
      ];
      newDoc.set(announcement);
    },
    async readData() {
      return (await this.$announcements.get()).docs
        .map(el => el.exists && { ...el.data(), id: el.id })
        .sort((a, b) => a.position - b.position);
    },
    update(idx, { title, content }) {
      const { id } = this.announcements[idx];
      this.announcements[idx] = {
        id,
        title,
        content,
      };
      this.snackbarSaved = true;

      this.$announcements.doc(id).update({
        title,
        content,
        updated_at: new Date().getTime(),
      });
    },
    deleteAnnouncement({ id }) {
      if (confirm(this.$t('deletePrompt', { name: this.$t('announcement') }))) {
        this.announcements = this.announcements.filter(item => item.id != id);
        this.$announcements.doc(id).delete();
      }
    },
    updatePosition() {
      const idNums = this.announcements.map(({ id }) => id);
      idNums.forEach((id, i) => {
        this.$announcements.doc(id).update({
          position: i,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.handler {
  width: 30px;
  height: 30px;
  background: #000;
}

.ghost {
  border: 2px solid black;
}
</style>
