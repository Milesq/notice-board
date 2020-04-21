<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template #activator="{ on }">
      <div v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save">{{ $t('save') }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container class="py-5 px-sm-10">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form>
              <v-text-field
                v-model="title"
                style="max-width: 30%;"
                :label="$t('titleWord')"
                outlined
              />
              <v-text-field label="Content" v-model="content" />
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: '',
    content: '',
  }),
  props: {
    value: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
      }),
    },
  },
  methods: {
    save() {
      this.$emit('save', {
        title: this.title,
        content: this.content,
      });

      this.dialog = false;
    },
    propsToData() {
      this.title = this.value.title;
      this.content = this.value.content;
    },
  },
  mounted() {
    this.propsToData();
  },
  watch: {
    dialog(isOpen) {
      if (!isOpen) {
        this.propsToData();
      }
    },
  },
};
</script>
