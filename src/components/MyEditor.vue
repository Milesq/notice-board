<template>
  <tiny-editor v-model="content" :api-key="key" :init="editorOptions" />
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { PdfTinyMceButton, ImageTinyMceButton } from '@/utils';

const key = 'wfnyipsdja07y0q2ttktp68jkxvn5b8eqd0egr7yk65qdj0y';

const editorOptions = {
  height: 400,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks fullscreen',
    'insertdatetime media table paste',
  ],
  toolbar:
    'formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist | removeformat | pdf | image | help',
  setup(editor) {
    editor.ui.registry.addButton('pdf', PdfTinyMceButton);
    editor.ui.registry.addButton('image', ImageTinyMceButton);
  },
};

export default {
  components: {
    'tiny-editor': Editor,
  },
  data: () => ({
    editorOptions,
    key,
    content: '',
  }),
};
</script>
