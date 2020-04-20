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
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container class="py-5 px-sm-10">
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto">
            <v-form>
              <v-text-field
                v-model="title"
                style="max-width: 30%"
                :label="$t('titleWord')"
                outlined
              />
              <editor
                api-key="wfnyipsdja07y0q2ttktp68jkxvn5b8eqd0egr7yk65qdj0y"
                v-model="content"
                :init="{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                }"
              />
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

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
  mounted() {
    this.title = this.value.title;
    this.content = this.value.content;
  },
  components: {
    Editor,
  },
};
</script>
