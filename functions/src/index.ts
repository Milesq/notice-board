import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import matchName from './matchName';
require('dotenv').config({ path: '../../.env.local' });

const serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_databaseURL,
});

const db = admin.firestore();

const uuidToken = () => admin.auth().createCustomToken('anonymous-account');

export const checkUserName = functions.https.onRequest(async (request, response) => {
  try {
    const { name } = JSON.parse(request.body);

    const users = await Promise.all(
      (await db.collection('users').listDocuments()).map(async el => (await el.get()).data())
    );

    const isAllowed = matchName(
      users.map(el => el?.name),
      name
    );

    response.setHeader('Access-Control-Allow-Origin', '*');

    response.send({
      token: isAllowed ? await uuidToken() : '',
    });
  } catch {
    response.send({
      token: '',
      err: 'Something went wrong',
    });
  }
});

export const deleteUnusedMedia = functions.firestore
  .document('announcements/{content}')
  .onDelete(data => {
    const { content } = data.data();
    console.log(content);

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(content, 'text/html');
    // const storage = admin.storage();
    // const mediaItems = [...doc.querySelectorAll('[data-toremove]')].map(item =>
    //   item.getAttribute('data-toremove')
    // );

    // mediaItems.forEach(item => {
    // const ref = storage.refFromURL(item.getAttribute('src'));
    // ref.delete();
    // });
  });
