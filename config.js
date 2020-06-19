const {
  VUE_APP_apiKey: apiKey,
  VUE_APP_authDomain: authDomain,
  VUE_APP_databaseURL: databaseURL,
  VUE_APP_projectId: projectId,
  VUE_APP_storageBucket: storageBucket,
  VUE_APP_messagingSenderId: messagingSenderId,
  VUE_APP_appId: appId,
  VUE_APP_measurementId: measurementId,
  VUE_APP_admins: admins,
  VUE_APP_firebaseAPI: firebaseAPI,
} = process.env;

export default {
  firebase: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  },
  admins: JSON.parse(admins),
  firebaseAPI,
};
