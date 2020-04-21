import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import Db from './plugins/db';
import { vuetify, i18n } from './plugins';

window.firebase = firebase;

Vue.use(Db, { injectedCollections: ['users', 'announcements'] });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
