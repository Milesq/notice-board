import * as firebase from 'firebase/app';
import 'firebase/firestore';

import config from '../../config';

config.apiKey = process.env.VUE_APP_FIREBASE_API;

export default {
  /**
   *
   * @param {*} Vue
   * @param {{ injectedCollections: Array<string> }} options
   */
  install(Vue, options) {
    const app = firebase.initializeApp(config);

    Vue.prototype.$db = app.firestore();

    options?.injectedCollections?.forEach(collectionName => {
      Vue.prototype['$' + collectionName] = Vue.prototype.$db.collection(collectionName);
    });
  },
};
