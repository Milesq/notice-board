/* eslint-env serviceworker */
/* global firebase */

// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyCSvOMNR7nrCa548aXG9Jb87G3z_DatT9A',
  authDomain: 'tests-d8957.firebaseapp.com',
  databaseURL: 'https://tests-d8957.firebaseio.com',
  projectId: 'tests-d8957',
  storageBucket: 'tests-d8957.appspot.com',
  messagingSenderId: '305225525597',
  appId: '1:305225525597:web:434ee2e0f5e8b5b6fca0b4',
  measurementId: 'G-8R4SBW6S2K',
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
firebase.messaging();
// [END initialize_firebase_in_sw]
