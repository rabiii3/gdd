import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { testMiddleware } from './middlewares';
import { combineReducers } from 'redux';
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
import tenants from '../reducers/tenants';
import stats from '../reducers/stats';

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
  tenants,
  stats,
});


const configureStore = (initialState, hooks) => {
  const baseMiddlewares = [thunk, testMiddleware(hooks)];
  const middlewares = baseMiddlewares;
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

export default configureStore;
