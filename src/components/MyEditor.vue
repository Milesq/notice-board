<template>
  <span>
    <v-progress-linear :value="progress" v-if="progress" ref="uploadProgressBar" />
    <tiny-editor v-on="$listeners" v-bind="$attrs" :api-key="key" :init="editorOptions" />
    <input id="file-input" type="file" style="display: none;" />
  </span>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { pdfTinyMceButton, imageTinyMceButton } from '@/utils';

const key = 'wfnyipsdja07y0q2ttktp68jkxvn5b8eqd0egr7yk65qdj0y';

const editorOptions = {
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
    editor.ui.registry.addButton('pdf', pdfTinyMceButton(editor, 'file-input'));
    editor.ui.registry.addButton('img', imageTinyMceButton(editor, 'file-input'));
  },
};

export default {
  components: {
    'tiny-editor': Editor,
  },
  data: () => ({
    editorOptions,
    key,
    progress: 0,
  }),
};
</script>
