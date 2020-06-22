<template>
  <v-dialog max-width="70%" v-model="dialog" :fullscreen="isMobile" :hide-overlay="isMobile">
    <template #activator="{ on }">
      <v-hover class="pointer" v-slot="{ hover }">
        <v-slide-y-transition>
          <v-card
            v-on="on"
            @click="onOpen"
            :min-height="tileMinHeight"
            :class="['grey', theme.isDark ? 'darken-3' : 'lighten-4']"
            :elevation="hover ? 4 : 1"
          >
            <v-card-title :class="['title', { 'title--mobile': isMobile }]" v-text="title" />
            <v-card-text>{{ content | limit }}</v-card-text>
            <v-card-subtitle>
              <div class="text-caption text-right mb-n1" v-if="created_at">
                {{ `${$t('created_at')}: ${created_at}` }}
              </div>
              <div class="text-caption text-right mb-n1" v-if="updated_at">
                {{ `${$t('updated_at')}: ${updated_at}` }}
              </div>
            </v-card-subtitle>
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

      <v-card-text style="min-height: 40vh;" class="pt-4">
        <p v-html="contentWithPdf" />
        <PdfLoader v-for="(pdf, i) in pdfFiles" :src="pdf" :key="`pdf-${i}`" />
      </v-card-text>

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
import PdfLoader from './PdfLoader';
const parser = new DOMParser();

function currentLang() {
  let lang = localStorage.getItem('lang');

  if (lang?.toLocaleLowerCase() === 'укр') {
    lang = 'ukr';
  }

  return lang ?? 'pl';
}

const dateFormatter = new Intl.DateTimeFormat(currentLang(), {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
});

const dateToFormat = date => dateFormatter.format(date);

export default {
  inject: ['theme'],
  components: {
    PdfLoader,
  },
  props: {
    title: {
      type: String,
      default: () => '',
    },
    content: {
      type: String,
      default: () => '',
    },
    timestamp: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dialog: false,
    pdfFiles: [],
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    tileMinHeight() {
      return this.isMobile ? 0 : 150;
    },
    contentWithPdf() {
      const { body } = parser.parseFromString(this.content, 'text/html');
      body.querySelectorAll('embed').forEach(el => {
        this.pdfFiles.push(el.getAttribute('src'));
        el.outerHTML = '';
      });

      return body.innerHTML;
    },
    /* eslint-disable vue/return-in-computed-property */
    created_at() {
      if (this.timestamp.created) return dateToFormat(new Date(this.timestamp.created));
    },
    updated_at() {
      if (this.timestamp.updated) return dateToFormat(new Date(this.timestamp.updated));
    },
    /* eslint-enable vue/return-in-computed-property */
  },
  watch: {
    dialog(isOpen) {
      if (isOpen) {
        window.analytics.logEvent('open_notification', {
          userName: localStorage.getItem('notice-board-user-name'),
          notice: this.title,
        });
      }
    },
  },
  methods: {
    onOpen() {
      history.pushState(
        {
          notice: this.title,
        },
        this.title
      );

      window.addEventListener('popstate', this.stateChange);
    },
    stateChange() {
      this.dialog = false;
      window.removeEventListener('popstate', this.stateChange);
    },
  },
};
</script>

<style scoped lang="scss">
.pointer {
  cursor: pointer;
}

.title {
  word-break: keep-all;

  &--mobile {
    font-weight: 400;
  }
}
</style>
