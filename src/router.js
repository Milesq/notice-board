import Vue from 'vue';
import VueRouter from 'vue-router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Home from '@/views/Home.vue';
import Board from '@/views/Board.vue';
import config from '../config.json';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
      meta: {
        admin: true,
      },
    },
    {
      path: '/login/admin',
      name: 'Adminlogin',
      component: () => import(/* webpackChunkName: "adminLogin" */ '@/views/AdminLogin.vue'),
    },
    {
      path: '/*',
      name: 'NotFound',
      redirect: '/',
    },
  ],
});

function getUser() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(resolve);
  });
}

router.beforeEach(async ({ meta: { admin } }, from, next) => {
  if (admin) {
    const user = await getUser();

    if (!user || !config.admins.includes(user.email)) {
      firebase.auth().signOut();
      next('/login/admin');
    }
  }

  next();
});

export default router;
