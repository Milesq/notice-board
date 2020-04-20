import cfg from '../../config';

const config = cfg.firebase;

config.apiKey = process.env.VUE_APP_FIREBASE_API;

export default {
  /**
   *
   * @param {*} Vue
   * @param {{ injectedCollections: Array<string> }} options
   */
  install(Vue, options) {
    const app = window.firebase.initializeApp(config);

    Vue.prototype.$db = app.firestore();

    options?.injectedCollections?.forEach(collectionName => {
      Vue.prototype['$' + collectionName] = Vue.prototype.$db.collection(collectionName);
    });
  },
};
