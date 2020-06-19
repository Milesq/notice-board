import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from '@/views/Board.vue';
import config from '../../config.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Board,
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/login',
      name: 'Userlogin',
      component: () => import(/* webpackChunkName: "adminLogin" */ '@/views/Login.vue'),
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
    window.firebase.auth().onAuthStateChanged(resolve);
  });
}

router.beforeEach(async ({ meta: { admin: adminRequired, authRequired } }, from, next) => {
  const user = await getUser();
  const isAdmin = config.admins.includes(user?.email);
  const isLoggedIn = !!user || isAdmin;

  if (adminRequired && !isAdmin) next('/login/admin');
  else if (authRequired && !isLoggedIn) next('/login');
  else next();
});

export default router;
