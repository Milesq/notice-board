import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  'en-EN': {
    title: 'Announcement',
    nameAndSurname: 'Name',
    typeName: 'Type name and surname',
    nameErrors: ['The name can contains only letters', 'Please pass both name and surname'],
    name: 'Name',
    search: 'Search...',
    deletePrompt: 'Are you sure you want to delete {name}',
    incorrectData: 'Incorrect data',
    logout: 'Logout',
    changeTheme: 'Change Theme',
    addUsers: 'Add users',
    manageAnnouncements: 'Manage announcements',
    titleWord: 'Title',
    settings: 'Settings',
    save: 'Save',
  },
  'pl-PL': {
    title: 'Ogłoszenia',
    nameAndSurname: 'Imie i nazwisko',
    typeName: 'Podaj imię i nazwisko',
    nameErrors: ['Imię może się składać tylko z liter', 'Podaj zarówno imię jak i nazwisko'],
    name: 'Imię',
    search: 'Szukaj...',
    deletePrompt: 'Czy chcesz usunąć użytkownika {name}',
    incorrectData: 'Nieprawidłowe dane',
    logout: 'Wyloguj się',
    changeTheme: 'Zmień tło',
    addUsers: 'Dodawanie użytkowników',
    manageAnnouncements: 'Menadżer ogłoszeń',
    titleWord: 'Tytuł',
    settings: 'Ustawienia',
    save: 'Zapisz',
  },
};

export default new VueI18n({
  locale: navigator.language,
  messages,
});
