import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import App from './App.vue';
import './registerServiceWorker';
import { vuetify, i18n, firebase as firebaseConfig, router, utils } from './plugins';

window.firebase = firebase;

Vue.use(firebaseConfig, { injectedCollections: ['users', 'announcements'] });
Vue.use(utils);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
