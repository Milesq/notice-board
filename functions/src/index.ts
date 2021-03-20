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

enum TOPICS {
  NEW_ANNOUNCEMENT = 'newAnnouncement',
}

const db = admin.firestore();
const msg = admin.messaging();
const admins = JSON.parse(process.env.VUE_APP_admins || '[]');

const uuidToken = () => admin.auth().createCustomToken('anonymous-account');

export const checkUserName = functions.region('europe-west1').https.onCall(async ({ name }) => {
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

export const subscribeMe = functions.region('europe-west1').https.onCall(async token => {
  await msg.subscribeToTopic(token, TOPICS.NEW_ANNOUNCEMENT);
});

export const getServerKey = functions.https.onRequest(async (request, response) => {
  try {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Authorization');
    const tokenId = request.get('Authorization')?.split('Bearer ')[1];

    if (!tokenId) {
      response.send({
        error: 'You must pass token!'
      });
      return;
    }

    const { email } = await admin.auth().verifyIdToken(tokenId);

    if (!email) {
      response.status(401).send({
        error: 'There is no email connect with your token!'
      });
      return;
    }

    if (!admins.includes(email)) {
      response.status(401).send({
        error: 'You are not an admin!'
      });
      return;
    }

    response.send({
      key: process.env.cloud_messaging_server_key,
    });
  } catch {
    response.status(500).send({
      error: 'Server error'
    });
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
