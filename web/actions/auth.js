import { map, pick } from 'ramda';
import { push } from 'connected-react-router';
import { listen } from './events';
import * as peopleActions from './people';
import * as commentActions from './comments';
import * as resumeActions from './resumes';
import * as skillsActions from './skills';
import { request } from './utils';
import { getToken } from '../selectors/auth';
import { isLoginMode, getTenantSiteUrl } from '../selectors/config';

export const USER_LOGGED = 'auth/USER_LOGGED';
export const USER_LOGIN = 'auth/USER_LOGIN';
export const USER_LOGOUT = 'auth/USER_LOGOUT';
export const USER_REGISTER = 'auth/USER_REGISTER';
export const USER_REGISTERED = 'auth/USER_REGISTERED';
export const USER_RESEND_REGISTER_CONFIRMATION = 'auth/USER_RESEND_REGISTER_CONFIRMATION';
export const USER_REQUEST_RESET_PASSWORD = 'auth/USER_REQUEST_RESET_PASSWORD';
export const USER_RESET_PASSWORD = 'auth/USER_RESET_PASSWORD';
export const SET_REGISTRATION_TOKEN = 'auth/SET_REGISTRATION_TOKEN';
export const TOKEN = 'koopt:token';

export const checkToken = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'auth:checkToken', token })
      .catch(() => dispatch({ type: USER_LOGOUT }));
};

export const logout = () => (dispatch, getState) => {
  localStorage.removeItem(TOKEN);
  const token = getToken(getState());
  request(dispatch, { method: 'auth:signOut', token });
  dispatch({ type: USER_LOGOUT });
};

export const logged = (user, token) => dispatch => {
  localStorage.setItem(TOKEN, token);
  dispatch({ type: USER_LOGGED, user, token });
  dispatch(listen());
  dispatch(skillsActions.loadAll());
  dispatch(peopleActions.loadAll());
  dispatch(resumeActions.loadAll())
    .then(resumes => dispatch(commentActions.loadAll(map(({ _id, entityType }) => ({ entityId: _id, entityType }), resumes))));
};

export const login = ({ email, password }) => (dispatch, getState) => {
  dispatch({ type: USER_LOGIN });
  return request(dispatch, { method: 'auth:signIn', email, password }).then(({ user, token }) => {
    if(isLoginMode(getState())){
      window.parent.postMessage({ type: USER_LOGGED, user, token }, '*');
    } else dispatch(logged(user, token));
  });
};

export const loginWith = ({ token, service }) => (dispatch, getState) => {
  dispatch({ type: USER_LOGIN, service });
  return request(dispatch, { method: 'auth:signInWith', token, service }).then(({ user, token }) => {
    if(isLoginMode(getState())){
      window.parent.postMessage({ type: USER_LOGGED, user, token }, '*');
    } else dispatch(logged(user, token));
  });
};

export const registerInWith = ({ token: googleToken, service }) => (dispatch, getState) => {
  const token = getToken(getState());
  dispatch({ type: USER_LOGIN, service });
  return request(dispatch, { method: 'auth:registerInWith', token, googleToken, service }).then(({ token }) => {
    const url = getTenantSiteUrl(getState());
    localStorage.setItem(TOKEN, token);
    window.location = url;
  })
};

export const registerIn = data => (dispatch, getState) => {
  const token = getToken(getState());
  const user = pick(['firstname', 'lastname', 'password', 'color'], data);
  return request(dispatch, { method: 'auth:registerIn', token, user }).then(({ token }) => {
    const url = getTenantSiteUrl(getState());
    localStorage.setItem(TOKEN, token);
    window.location = url;
  })
};

export const register = data => dispatch => {
  const user = pick(['firstname', 'lastname', 'email', 'password', 'color'], data);
  dispatch({ type: USER_REGISTER, user });
  return request(dispatch, { method: 'auth:register', user }).then(() => dispatch(push('/register_almost_there')));
};

export const updatePassword = ({ token, password }) => dispatch => {
  return request(dispatch, { method: 'auth:updatePassword', token, password }).then(() => dispatch(push('/')));
};

export const requestResetPassword = ({ email }) => dispatch => {
  dispatch({ type: USER_REQUEST_RESET_PASSWORD, email });
  return request(dispatch, { method: 'auth:requestResetPassword', email }).then(() =>
    dispatch(push('/reset_almost_there')),
  );
};

export const resendRegisterConfirmation = ({ email }) => dispatch => {
  dispatch({ type: USER_RESEND_REGISTER_CONFIRMATION, email });
  return request(dispatch, { method: 'auth:resendRegisterConfirmation', email }).then(() =>
    dispatch(push('/register_almost_there')),
  );
};
