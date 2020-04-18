import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from '../colors.json';

Vue.use(Vuetify);

const { dark, light } = colors;

export default new Vuetify({
  theme: {
    dark: localStorage.getItem('darkTheme') === 'true',
    themes: {
      light,
      dark,
    },
  },
});
