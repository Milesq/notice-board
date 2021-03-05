import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { config as dotenv } from 'dotenv';
import { join } from 'path';
import matchName from './matchName';

dotenv({ path: join(__dirname, '../../.env.local') });

const serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const uuidToken = () => admin.auth().createCustomToken('anonymous-account');

export const checkUserName = functions.https.onCall(async ({ name }) => {
  try {
    console.warn(`Try logged at ${new Date()} - ${name}`);

    const users = await Promise.all(
      (await db.collection('users').listDocuments()).map(async el => (await el.get()).data())
    );

    const isAllowed = matchName(
      users.map(el => el?.name),
      name
    );

    return {
      token: isAllowed ? await uuidToken() : '',
    };
  } catch {
    return {
      token: '',
      err: 'Something went wrong',
    };
  }
});

export const deleteUnusedMedia = functions
  .region('europe-west1')
  .firestore.document('announcements/{content}')
  .onDelete(data => {
    const { content } = data.data();
    console.warn(content);

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
