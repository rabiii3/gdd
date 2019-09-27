import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const configureStore = (rootReducer, middlewares=[]) => (initialState, history) =>
  createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, ...middlewares, createLogger)),
  );

export default configureStore;
