import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Board from '@/views/Board.vue';

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

router.beforeEach(({ meta: { admin } }, from, next) => {
  if (admin) {
    next('/login/admin');
  }

  next();
});

export default router;
