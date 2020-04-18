import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import Db from './plugins/db';
import { vuetify, i18n } from './plugins';

// TODO: Db plugin should be applied after admin auth with google
Vue.use(Db);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');
