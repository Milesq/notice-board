const tinyMceButton = (text, createHTMLElement) => (editor, inputID) => ({
  text,
  onAction() {
    const el = document.getElementById(inputID);
    el.click();
    el.addEventListener('change', async () => {
      const [file] = el.files;
      const storageRef = window.firebase.storage().ref();

      const ref = storageRef.child(file.name);
      const uploadTask = ref.put(file);
      /*
      if (progressBar) {
        console.log(progressBar);
        uploadTask.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        });
      } */

      const res = await uploadTask;
      const url = await res.ref.getDownloadURL();

      editor.insertContent(createHTMLElement(url));
    });
  },
});

const img = tinyMceButton('Image', url => `&nbsp;<img src="${url}" />&nbsp;`);
const pdf = tinyMceButton('PDF', url => `<embed src="${url}" height="375">`);

export { img, pdf };
