<template>
  <v-dialog
    v-model="dialog"
    @keydown.esc="cancel"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on }">
      <div v-on="!passOpener ? on : {}">
        <slot :open="on" />
      </div>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save">{{ $t('save') }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container class="py-5 px-md-10">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form ref="form">
              <v-text-field
                :rules="[title => title.length >= 4 || $t('tooShort', { minVal: 4 })]"
                v-model="title"
                :style="{ maxWidth: isMobile ? '100%' : '30%' }"
                :label="$t('titleWord')"
                outlined
              />
              <my-editor v-model="content" />
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import 'firebase/storage';
import MyEditor from './MyEditor';

export default {
  components: {
    MyEditor,
  },
  props: {
    passOpener: {
      type: Boolean,
      default: () => false,
    },
    value: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
      }),
    },
  },
  data: () => ({
    dialog: false,
    title: '',
    content: '',
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  watch: {
    dialog(isOpen) {
      if (!isOpen) {
        this.propsToData();
      }
    },
  },
  mounted() {
    this.propsToData();
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$emit('save', {
          title: this.title,
          created_at: new Date().getTime(),
          content: this.content,
        });

        this.dialog = false;
      }
    },
    cancel() {
      const notChanged = this.value.title === this.title && this.value.content === this.content;

      if (notChanged || confirm(this.$t('areYouWantCancel'))) {
        this.dialog = false;
      }
    },
    propsToData() {
      this.title = this.value.title;
      this.content = this.value.content;
    },
  },
};
</script>
