import loadable from '@loadable/component';

const Home = loadable(() => import('./Home'));
const BranchDetail = loadable(() => import('./BranchDetail'));
const SaleDetail = loadable(() => import('./SaleDetail'));
const PageNotFound = loadable(() => import('./PageNotFound'));

var indexRoutes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/branch/:id',
    component: BranchDetail,
    exact: true,
  },
  {
    path: '/sale/:branch_id/:sale_id',
    component: SaleDetail,
    exact: true,
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

export default indexRoutes;
