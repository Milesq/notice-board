import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
  },
  pl: {
    message: {
      hello: 'Witaj Świecie',
    },
  },
};

export default new VueI18n({
  locale: 'pl',
  messages,
});
