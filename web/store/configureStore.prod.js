import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const configureStore = (rootReducer, middlewares=[]) => (initialState, history) =>
  createStore(
    connectRouter(history)(rootReducer), 
    initialState, 
    applyMiddleware(routerMiddleware(history), thunk, ...middlewares)
  );

export default configureStore;
