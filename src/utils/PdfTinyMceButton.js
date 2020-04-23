export default editor => ({
  text: 'PDF',
  onAction() {
    editor.insertContent('&nbsp;<img src="https://picsum.photos/200" />&nbsp;');
  },
});
