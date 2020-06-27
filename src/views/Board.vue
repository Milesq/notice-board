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

    <v-bottom-sheet v-model="notificationPropose" inset>
      <v-sheet class="text-center" height="200px">
        <div class="py-6 px-6 px-md-0">{{ $t('notificationAsk') }}</div>

        <v-btn class="mx-6" color="primary" @click="notificationAskAllow">{{
          $t('notificationAllow')
        }}</v-btn>
        <v-btn class="mx-6" color="error" @click="notificationAskDeny">{{
          $t('notificationDeny')
        }}</v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import 'firebase/messaging';
import ShowAnnouncement from '../components/ShowAnnouncement.vue';

const secs = ms => ms * 1000;
const minutes = s => 60 * secs(s);
const hours = m => 60 * minutes(m);
const days = h => 24 * hours(h);

const now = () => new Date().getTime();

function subscribeNewAnnounements() {
  /**
   * @param {string} token
   */
  function subscribibeToTopic(token) {
    fetch(`${process.env.VUE_APP_firebaseAPI}/subscribeMe`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  const messaging = window.firebase.messaging();

  messaging.usePublicVapidKey(process.env.VUE_APP_cloud_messaging_vapid_key);

  const subscribibeToTopicWithToken = () => messaging.getToken().then(subscribibeToTopic);

  messaging.onTokenRefresh(subscribibeToTopicWithToken);

  messaging
    .requestPermission()
    .then(subscribibeToTopicWithToken)
    .catch(err => {
      console.warn('Unable to get permission to notify.', err);
    });
}

export default {
  components: {
    ShowAnnouncement,
  },
  data: () => ({
    announcements: [],
    loaded: false,
    notificationPropose: false,
  }),
  created() {
    this.loadAnnouncements();
    window.analytics.setUserId(
      localStorage.getItem('notice-board-user-name') ||
        (() => (console.log('anonyomus-error'), 'anonyomus-error'))()
    );
    window.analytics.logEvent('open_board');
  },
  mounted() {
    const notificationNotGranted = Notification.permission === 'default';
    const timeFromLastAsk = parseInt(localStorage.getItem('timeFromLastAsk')) || 0;

    if (notificationNotGranted && now() >= timeFromLastAsk + days(4)) this.askNotification();
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
    askNotification() {
      this.notificationPropose = true;
    },
    notificationAskAllow() {
      this.notificationPropose = false;
      setTimeout(subscribeNewAnnounements, 300);
    },
    notificationAskDeny() {
      this.notificationPropose = false;
      localStorage.setItem('timeFromLastAsk', now());
    },
  },
};
</script>
