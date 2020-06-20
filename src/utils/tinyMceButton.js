import urlify from './urlify';
import randoms from './randoms';

const tinyMceButton = (text, createHTMLElement) => (editor, inputID, onStart, onFinish) => ({
  text,
  onAction() {
    const el = document.getElementById(inputID);
    el.click();
    el.addEventListener('change', async () => {
      onStart?.();
      const [file] = el.files;
      const storageRef = window.firebase.storage().ref();
      const newFileName = urlify(file.name, false) + randoms(10).join('');

      const ref = storageRef.child(newFileName);
      const uploadTask = ref.put(file);

      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          onFinish?.();
        }
      });

      const res = await uploadTask;
      const url = await res.ref.getDownloadURL();

      editor.insertContent(createHTMLElement(url, newFileName));
    });
  },
});

const img = tinyMceButton(
  'Image',
  (url, includedMedia) => `<img src="${url}" data-toremove="${includedMedia}" alt="" />`
);
const pdf = tinyMceButton(
  'PDF',
  (url, includedMedia) => `<embed src="${url}" data-toremove="${includedMedia}" height="375">`
);

export { img, pdf };
