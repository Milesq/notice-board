<template>
  <div class="d-flex justify-center pt-10">
    <GoogleSingIn @click.native="login" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import GoogleSingIn from '@/components/GoogleSignIn.vue';

export default {
  name: 'AdminLogin',
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
  },
  components: {
    GoogleSingIn,
  },
};
</script>
