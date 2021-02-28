import DashboardHome from './DashboardHome';
import Emissao from './Emissao';
import Clientes from './Clientes';
import Dashboard from '@/components/Dashboard';
import Guard from '@/service/middleware';


export default [
  { path: '/', redirect: { name: 'Dashboard' } },
  {
    path: '/cte',
    beforeEnter: Guard.redirectIfNotAuthenticated,
    component: Dashboard,
    redirect: '/cte/dashboard',
    children: [
      {
        path: '/cte/dashboard',
        name: 'Dashboard',
        component: DashboardHome,
      },
      {
        path: '/cte/emissao',
        name: 'Emissao',
        component: Emissao,
      },
      {
        path: '/cte/clientes',
        name: 'Clientes',
        component: Clientes,
      },
    ],
  },
];
