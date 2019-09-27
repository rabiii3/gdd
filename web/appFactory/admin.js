import { combineReducers } from 'redux';
import admin from '../../lib/admin';
import { TOKEN, logged, checkToken, USER_LOGOUT } from '../actions/admin/auth';
import App from '../admin/App/Loadable';
import configureStore from '../store/configureStore';
import { checkAuthMiddleware } from '../store/middlewares';
import auth from '../reducers/auth';
import language from '../reducers/language';
import config from '../reducers/config';
import core from '../reducers/core';
import tenants from '../reducers/tenants';
import stats from '../reducers/stats';
import people from '../reducers/tenantPeople';
import notifications from '../reducers/notifications';

const rootReducer = combineReducers({
  auth,
  language,
  config,
  notifications,
  core,
  tenants,
  stats,
  people,
});

const launchApp = async (render, store) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    await admin.auth
      .loadFromToken({ token })
      .then(user => store.dispatch(logged(user, token)))
      .catch(() => store.dispatch({ type: USER_LOGOUT }));
  }
  render();
};

export default {
  launchApp,
  configureStore: configureStore(rootReducer, [checkAuthMiddleware(checkToken)]),
  App,
};
