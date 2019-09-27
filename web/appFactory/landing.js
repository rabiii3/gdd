import { combineReducers } from 'redux';
import App from '../landing/App/Loadable';
import configureStore from '../store/configureStore';
import language from '../reducers/language';
import config from '../reducers/config';

const rootReducer = combineReducers({
  language,
  config,
});

const launchApp = async render => {
  render();
};

export default {
  launchApp,
  configureStore: configureStore(rootReducer),
  App,
};
