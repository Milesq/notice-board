<template>
  <div class="d-flex justify-center pt-10">
    <GoogleSingIn @click.native="login" />
  </div>
</template>

<script>
import GoogleSingIn from '@/components/GoogleSignIn.vue';
import config from '../../config.js';

export default {
  name: 'AdminLogin',
  components: {
    GoogleSingIn,
  },
  methods: {
    login() {
      const provider = new window.firebase.auth.GoogleAuthProvider();
      window.firebase
        .auth()
        .signInWithPopup(provider)
        .then(({ user }) => {
          if (!config.admins.includes(user.email)) {
            window.firebase.auth().signOut();
            alert('You are not an admin!');
            this.$router.push('/');
            return;
          }

          this.$router.push('/admin');
        });
    },
  },
};
</script>
