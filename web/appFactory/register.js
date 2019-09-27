import { combineReducers } from 'redux';
import App from '../components/RegisterApp';
import configureStore from '../store/configureStore';
import auth from '../reducers/auth';
import { SET_REGISTRATION_TOKEN } from '../actions/auth';
import language from '../reducers/language';
import config from '../reducers/config';
import core from '../reducers/core';
import api from '../../lib/api';

const rootReducer = combineReducers({
  auth,
  language,
  config,
  core,
});

const launchApp = async (render, store) => {
  const { config } = store.getState();
  api.config({ tenant: config.tenant.key });
  store.dispatch({ type: SET_REGISTRATION_TOKEN, token: config.registrationToken });
  render();
}

export default {
  launchApp,
  configureStore: configureStore(rootReducer),
  App,
};
