import * as firebase from 'firebase/app';
import 'firebase/firestore';

import config from '../../config';

config.apiKey = process.env.VUE_APP_FIREBASE_API;

export default {
  install(Vue) {
    const app = firebase.initializeApp(config);

    Vue.prototype.$db = app.firestore();
  },
};
