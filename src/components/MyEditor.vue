<template>
  <span>
    <v-progress-linear indeterminate v-if="loader" />
    <tiny-editor
      v-on="$listeners"
      v-bind="$attrs"
      :api-key="key"
      v-if="editorOptions"
      :init="editorOptions"
    />
    <input id="file-input" type="file" style="display: none;" />
  </span>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { pdf, img } from '../utils';

const key = process.env.VUE_APP_tiny_mce_api_key;

export default {
  components: {
    'tiny-editor': Editor,
  },
  data: () => ({
    key,
    loader: false,
    editorOptions: null,
  }),
  mounted: function () {
    const loader = {
      start: () => {
        this.loader = true;
      },
      stop: () => {
        this.loader = false;
      },
    };

    this.editorOptions = {
      height: 400,
      menubar: false,
      plugins: [
        'advlist autolink lists link charmap print preview anchor',
        'searchreplace visualblocks fullscreen',
        'insertdatetime media table paste',
      ],
      toolbar:
        'formatselect | bold italic backcolor forecolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist | removeformat | img | pdf | help',
      setup(editor) {
        editor.ui.registry.addButton('pdf', pdf(editor, 'file-input', loader.start, loader.stop));
        editor.ui.registry.addButton('img', img(editor, 'file-input', loader.start, loader.stop));
      },
    };
  },
};
</script>
