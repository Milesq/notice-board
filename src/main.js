import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import App from './App.vue';
import './registerServiceWorker';
import { vuetify, i18n, db, router } from './plugins';

window.firebase = firebase;

Vue.use(db, { injectedCollections: ['users', 'announcements'] });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
