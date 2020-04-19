import GoogleSingIn from '../src/components/GoogleSignIn.vue';

export default {
  title: 'Button',
};

export const button = () => ({
  template: '<GoogleSingIn />',
  components: {
    GoogleSingIn,
  },
});
