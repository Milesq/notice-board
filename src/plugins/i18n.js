import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  'en-EN': {
    hello: 'Announcement',
    nameAndSurname: 'Name',
    typeName: 'Type name and surname',
    nameErrors: ['The name can contains only letters', 'Please pass both name and surname'],
    name: 'Name',
    search: 'Search...',
  },
  'pl-PL': {
    title: 'Ogłoszenia',
    nameAndSurname: 'Imie i nazwisko',
    typeName: 'Podaj imię i nazwisko',
    nameErrors: ['Imię może się składać tylko z liter', 'Podaj zarówno imię jak i nazwisko'],
    name: 'Imię',
    search: 'Szukaj...',
  },
};

export default new VueI18n({
  locale: navigator.language,
  messages,
});
