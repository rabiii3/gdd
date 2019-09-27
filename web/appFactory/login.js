import { combineReducers } from 'redux';
import App from '../components/LoginApp';
import configureStore from '../store/configureStore';
import auth from '../reducers/auth';
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
  render();
}

export default {
  launchApp,
  configureStore: configureStore(rootReducer),
  App,
};
