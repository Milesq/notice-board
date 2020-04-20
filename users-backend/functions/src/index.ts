import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tests-d8957.firebaseio.com',
});

const db = admin.firestore();

const uuidToken = () => admin.auth().createCustomToken("anonymous-account");

export const checkUserName = functions.https.onRequest(async (request, response) => {

  try {
    const { name } = JSON.parse(request.body);

    const users = await Promise.all((await db.collection('users').listDocuments())
      .map(async el => (await el.get()).data()));

    const isAllowed = matchName(users.map(el => el?.name), name);

    response.setHeader('Access-Control-Allow-Origin', '*');

    response.send({
      token: isAllowed? await uuidToken() : '',
    });
  } catch {
    response.send({
      token: '',
      err: 'Something went wrong'
    });
  }
});

function matchName(arr: string[], name: string): boolean {
  const accentsIn = 'ęóąśłżźćń'.split('');
  const accentsOut = 'eoaslzzcn'.split('');
  const accents: {[letter: string]: string} = accentsIn.reduce((acc, el, i) => ({ ...acc, [el]: accentsOut[i] }), {});

  const normalize = (s: string) => s
    .toLocaleLowerCase()
    .split('')
    .map(letter => accents[letter]?? letter)
    .join('')
    .split(' ')
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .join('')
    .replace(/[^a-z]/g, '');

  return arr.map(user => normalize(user)).includes(normalize(name));
}
