/* eslint-env serviceworker */
/* global firebase */

// [START initialize_firebase_in_sw]
importScripts('https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'process.env.VUE_APP_apiKey',
  projectId: 'tests-d8957',
  messagingSenderId: '305225525597',
  appId: '1:305225525597:web:434ee2e0f5e8b5b6fca0b4',
});

firebase.messaging();
// [END initialize_firebase_in_sw]
