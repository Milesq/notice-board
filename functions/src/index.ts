import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import matchName from './matchName';
require('dotenv').config({ path: '../../.env.local' });

const serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.VUE_APP_databaseURL,
});

enum TOPICS {
  NEW_ANNOUNCEMENT = 'newAnnouncement',
}

const db = admin.firestore();
const msg = admin.messaging();

const uuidToken = () => admin.auth().createCustomToken('anonymous-account');

export const checkUserName = functions.https.onRequest(async (request, response) => {
  try {
    const { name } = JSON.parse(request.body);
    console.warn(`Try logged at ${new Date()} - ${name}`);

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

export const subscribeMe = functions.https.onRequest(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { token } = JSON.parse(request.body);

    await msg.subscribeToTopic(token, TOPICS.NEW_ANNOUNCEMENT);
    response.send({
      data: true,
    });
  } catch {
    response.send({
      err: 'Something went wrong',
    });
  }
});

export const sendNotification = functions.firestore
  .document('announcements/{content}')
  .onCreate(snapshot => {
    const { title } = snapshot.data();

    msg.sendToTopic(TOPICS.NEW_ANNOUNCEMENT, {
      notification: {
        title: 'New announcement',
        body: title,
      },
    });
  });

export const deleteUnusedMedia = functions.firestore
  .document('announcements/{content}')
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
