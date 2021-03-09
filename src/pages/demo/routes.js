import DashboardHome from './DashboardHome';
import Krepe from './Krepe';
import Dashboard from './Dashboard';
import Guard from '@/service/middleware';


export default [
  {
    path: '/demo',
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: Dashboard,
    redirect: '/demo/dashboard',
    children: [
      {
        path: '/demo/dashboard',
        name: 'Dashboard',
        component: DashboardHome,
      },
      {
        path: '/demo/krepe',
        name: 'Krepe',
        component: Krepe,
      },
    ],
  },
];
