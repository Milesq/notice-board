import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v1 } from 'uuid';

const serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tests-d8957.firebaseio.com',
});

const db = admin.firestore();

const uuidToken = admin.auth().createCustomToken(v1());

export const checkUserName = functions.https.onRequest(async (request, response) => {
  try {
    const { name } = JSON.parse(request.body);

    const users = await Promise.all((await db.collection('users').listDocuments())
      .map(async el => (await el.get()).data()));

    let isAllowed = matchName(users.map(el => el?.name), name);

    response.setHeader('Access-Control-Allow-Origin', '*');

    response.send({
      token: isAllowed? await uuidToken : '',
    });
  } catch {
    response.send({
      token: '',
      err: 'Something went wrong'
    });
  }
});

function matchName(arr: string[], name: string): boolean {
  const normalize = (s: string) => s.toLowerCase().split(' ').join('').replace(/[^a-z]/g, '');

  arr = arr.map(name => normalize(name));
  name = normalize(name);

  return true;
}
