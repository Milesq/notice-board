import config from '../../config.js';

export default {
  /**
   *
   * @param {*} Vue
   * @param {{ injectedCollections: Array<string> }} options
   */
  install(Vue, options) {
    const app = window.firebase.initializeApp(config.firebase);

    Vue.prototype.$db = app.firestore();
    window.app.firestore = Vue.prototype.$db;

    options?.injectedCollections?.forEach(collectionName => {
      Vue.prototype['$' + collectionName] = Vue.prototype.$db.collection(collectionName);
    });
  },
};
