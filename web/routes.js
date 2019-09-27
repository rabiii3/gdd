import { path, filter, compose, find, prop, reduce, toPairs } from 'ramda';

import PeoplePage from './pages/People/Loadable';
import UpdateResumePage from './pages/UpdateResume/Loadable';
import AddResumePage from './pages/AddResume/Loadable';
import RegisterAlmostTherePage from './pages/RegisterAlmostThere/Loadable';
import TenantsPage from './admin/Tenants/Loadable';
import ResetAlmostTherePage from './pages/ResetAlmostThere/Loadable';
import RequestConfirmationEmail from './pages/RequestConfirmationEmail/Loadable';
import RequestResetPasswordPage from './pages/RequestResetPassword/Loadable';
import ResetPasswordPage from './pages/ResetPassword/Loadable';
import ResumesPage from './pages/Resumes/Loadable';
import SkillsPage from './pages/Skills/Loadable';
import AgendaPage from './pages/Agenda/Loadable';
import StatisticsPage from './pages/Statistics/Loadable';
import PersonPage from './pages/Person/Loadable';
import Login from './components/Login/Loadable';
import UnauthorizedPage from './pages/Unauthorized/Loadable';
import NotFound from './pages/NotFound/Loadable';
import { ROLE } from '../lib/models/people';
import MODE from './utils/modes';
import AddTenantPage from './admin/AddTenant/Loadable';
import UpdateTenantPage from './admin/UpdateTenant/Loadable';
import LandingPage from './landing/Landing/Loadable';
import Jobs from './pages/Jobs/Loadable';
import AddJob from './pages/AddJob/Loadable';
import UpdateJob from './pages/UpdateJob/Loadable';
import TenantPage from './admin/Tenant/Loadable';

const routes = {
  resumes: {
    path: '/resumes',
    component: ResumesPage,
    exact: true,
    auth: true,
    default: true,
    mode: MODE.APP,
  },
  people: {
    path: '/people',
    component: PeoplePage,
    exact: true,
    auth: true,
    roles: [ROLE.admin, ROLE.headHunter],
    mode: MODE.APP,
  },
  person: {
    path: '/person/:id',
    component: PersonPage,
    exact: true,
    auth: true,
    mode: MODE.APP,
  },
  editResume: {
    path: '/resume/:id',
    component: UpdateResumePage,
    exact: true,
    auth: true,
    mode: MODE.APP,
  },
  addResume: {
    path: '/add_resume',
    component: AddResumePage,
    exact: true,
    auth: true,
    mode: MODE.APP,
  },
  signIn: {
    path: '/signIn',
    component: Login,
    exact: true,
    auth: false,
    default: true,
    mode: MODE.LOGIN,
  },

  reset_almost_there: {
    path: '/reset_almost_there',
    component: ResetAlmostTherePage,
    exact: true,
    auth: false,
    mode: MODE.LOGIN,
  },
  registerAlmostThere: {
    path: '/register_almost_there',
    component: RegisterAlmostTherePage,
    exact: true,
    auth: false,
    mode: MODE.LOGIN,
  },
  requestNewConfirmationEmail: {
    path: '/request_confirmation',
    component: RequestConfirmationEmail,
    exact: true,
    auth: false,
    mode: MODE.LOGIN,
  },
  requestResetPassword: {
    path: '/request_reset_password',
    component: RequestResetPasswordPage,
    exact: true,
    auth: false,
    mode: MODE.LOGIN,
  },
  resetPassword: {
    path: '/reset_password',
    component: ResetPasswordPage,
    exact: true,
    auth: false,
    mode: MODE.LOGIN,
  },
  unauthorized: {
    path: '/unauthorized',
    component: UnauthorizedPage,
    exact: true,
    auth: true,
    mode: MODE.ALL,
  },
  notFound: {
    path: '/not_found',
    component: NotFound,
    exact: true,
    auth: false,
    mode: MODE.ALL,
  },
  skills: {
    path: '/skills',
    component: SkillsPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin, ROLE.headHunter],
    mode: MODE.APP,
  },
  agenda: {
    path: '/agenda',
    component: AgendaPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin, ROLE.headHunter],
    mode: MODE.APP,
  },
  statistics: {
    path: '/statistics',
    component: StatisticsPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin, ROLE.headHunter],
    mode: MODE.APP,
  },
  tenants: {
    path: '/admin/tenants',
    component: TenantsPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin],
    default: true,
    mode: MODE.ADMIN,
  },
  addTenant: {
    path: '/admin/add_tenant',
    component: AddTenantPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin],
    default: true,
    mode: MODE.ADMIN,
  },
  updateTenant: {
    path: '/admin/update_tenant/:id',
    component: UpdateTenantPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin],
    default: true,
    mode: MODE.ADMIN,
  },
  viewTenant: {
    path: '/admin/tenant/:id',
    component: TenantPage,
    exact: true,
    auth: true,
    roles: [ROLE.admin],
    default: true,
    mode: MODE.ADMIN,
  },
  landing: {
    path: '/',
    component: LandingPage,
    default: true,
    mode: MODE.LANDING,
  },

  jobs: {
    path: '/jobs',
    component: Jobs,
    exact: true,
    auth: true,
    roles: [ROLE.admin, ROLE.headHunter],
    mode: MODE.APP,
  },
  addJob: {
    path: '/add_job',
    component: AddJob,
    exact: true,
    auth: true,
    mode: MODE.APP,
  },
  updateJob: {
    path: '/job/:id',
    component: UpdateJob,
    exact: true,
    auth: true,
    mode: MODE.APP,
  },
};

const exportedRoutes = compose(
  reduce((acc, [name, r]) => [...acc, { ...r, name }], []),
  toPairs,
  filter(prop('path')),
)(routes);

export const getDefaultRoute = (mode=MODE.APP) => find(route => route.default && route.mode === mode, exportedRoutes);
export const getRouteByName = name => routes[name];
export const getRouteByPath = path => find(r => r.path === path, exportedRoutes);
export const getPathByName = (name, param) => {
  const path = prop('path', getRouteByName(name));
  return param ? `${path.replace(':id', param)}` : path;
};
export const getRouteProp = prop => name => path([name, prop], routes);
export const getRouteRoles = getRouteProp('roles');
export const getRouteAuthProps = name => ({ roles: getRouteRoles(name) });
export const isAuthRequired = route => route && (route.auth || route.roles);
export const signInRoute = '/signIn';
// export const makeSignInRoute = (url, tenant) => `${url}${signInRoute}?tenant=${tenant}&_p=${btoa(JSON.stringify({ mode: MODE.LOGIN }))}`;
export const makeSignInRoute = (url, tenant) => `${url}${signInRoute}?tenant=${tenant}`;
export const isSignInRoute = ({ pathname }) => pathname === signInRoute;

export default {
  getRoutes: () => exportedRoutes,
  getDefaultRoute,
  getRouteByName,
  getPathByName,
  getRouteByPath,
  getRouteProp,
  getRouteRoles,
  getRouteAuthProps,
  isAuthRequired,
  signInRoute,
  makeSignInRoute,
  isSignInRoute,
};
