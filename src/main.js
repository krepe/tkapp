import Vue from 'vue';
//import VueRouter from 'vue-router';
import router from '@/router';
import store from '@/store';
import '@/plugins/vee-validate';
import '@/plugins/axios';
import '@/assets/css/tailwind.css';

import App from './App.vue';
import NProgress from 'vue-nprogress';
 
const options = {
  latencyThreshold: 200, // Number of ms before progressbar starts showing
  router: true, // Show progressbar when navigating routes
  http: true, // Show progressbar when doing Axios.http or Vue.http
};

Vue.config.productionTip = false;

Vue.use(NProgress, options);

const nprogress = new NProgress();

new Vue({
  render: h => h(App),
  nprogress,
  router,
  store,
}).$mount('#app');
