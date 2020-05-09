const tinyMceButton = (text, createHTMLElement) => (editor, inputID, onStart, onFinish) => ({
  text,
  onAction() {
    const el = document.getElementById(inputID);
    el.click();
    el.addEventListener('change', async () => {
      onStart?.();
      const [file] = el.files;
      const storageRef = window.firebase.storage().ref();

      const ref = storageRef.child(file.name);
      const uploadTask = ref.put(file);

      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          onFinish?.();
        }
      });

      const res = await uploadTask;
      const url = await res.ref.getDownloadURL();

      editor.insertContent(createHTMLElement(url));
    });
  },
});

const img = tinyMceButton('Image', url => `<img src="${url}" alt="" />`);
const pdf = tinyMceButton('PDF', url => `<embed src="${url}" height="375">`);

export { img, pdf };
