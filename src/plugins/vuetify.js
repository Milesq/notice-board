import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import light from '../colors.json';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light,
    },
  },
});
