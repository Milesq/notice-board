import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/functions';
import App from './App.vue';
import './registerServiceWorker';
import { vuetify, i18n, router, firebaseConfig, utils } from './plugins';

window.firebase = firebase;

Vue.use(firebaseConfig, { injectedCollections: ['users', 'announcements'] });
Vue.use(utils);

window.analytics = firebase.analytics();

Vue.config.productionTip = false;

if (location.hostname === 'localhost') {
  firebase.functions().useEmulator('localhost', 5001);
  firebase.firestore().useEmulator('localhost', 8080);
}

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
