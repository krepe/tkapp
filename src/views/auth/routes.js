import Login from './Login.vue';
import ForgotPassword from './ForgotPassword.vue';
import ResetPassword from './ResetPassword.vue';
import VerifyEmail from './VerifyEmail.vue';
import Modules from './Modules.vue';
import P404 from './P404.vue';
import Guard from '@/service/middleware';

export default [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: Guard.redirectIfAuthenticated,
    components: { default: Login },
    props: {
      header: { colorOnScroll: 400 },
    },
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    components: { default: VerifyEmail },
    props: {
      header: { colorOnScroll: 400 },
    },
  },
  {
    path: '/esqueci-senha',
    name: 'ForgotPassword',
    beforeEnter: Guard.redirectIfAuthenticated,
    components: { default: ForgotPassword },
    props: {
      header: { colorOnScroll: 400 },
    },
  },
  {
    path: '/recuperar-senha', 
    name: 'ResetPassword',
    components: { default: ResetPassword },
    props: {
      header: { colorOnScroll: 400 },
    },
  },
  {
    path: '/404',
    name: 'P404',
    components: { default: P404 },
  },
  {
    path: '/modulos',
    name: 'Modules',
    beforeEnter: Guard.redirectIfNotAuthenticated,
    components: { default: Modules },
  },

  { path: '*', redirect: '/404', hidden: true },
];
