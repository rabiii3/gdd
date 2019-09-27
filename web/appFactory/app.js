import { combineReducers } from 'redux';
import api from '../../lib/api';
import { TOKEN, USER_LOGGED, USER_LOGOUT, checkToken, logged } from '../actions/auth';
import configureStore from '../store/configureStore';
import { checkAuthMiddleware } from '../store/middlewares';
import App from '../components/App';
import auth from '../reducers/auth';
import language from '../reducers/language';
import config from '../reducers/config';
import resumes from '../reducers/resumes';
import people from '../reducers/people';
import comments from '../reducers/comments';
import core from '../reducers/core';
import notifications from '../reducers/notifications';
import skills from '../reducers/skills';
import statistics from '../reducers/statistics';
import jobs from '../reducers/jobs';

const rootReducer = combineReducers({
  auth,
  language,
  config,
  resumes,
  statistics,
  people,
  comments,
  notifications,
  core,
  skills,
  jobs,
});

const launchApp = async (render, store) => {
  const { config } = store.getState();
  api.config({ tenant: config.tenant.key, firebase: config.firebase });
  const token = localStorage.getItem(TOKEN);
  window.onmessage = e => {
    if(e.origin === config.loginSiteUrl) {
      if(e.data.type === USER_LOGGED){
        api.auth
          .loadFromToken({ token: e.data.token })
          .then(user => store.dispatch(logged(user, e.data.token)))
          .catch(() => store.dispatch({ type: USER_LOGOUT }));
      }
    }
  };

  if (token) {
    await api.auth
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
