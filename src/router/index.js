import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes, // short for routes: routes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
