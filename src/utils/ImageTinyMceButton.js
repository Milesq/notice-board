export default editor => ({
  text: 'Image',
  onAction() {
    editor.insertContent('&nbsp;<img src="https://picsum.photos/200" />&nbsp;');
  },
});
