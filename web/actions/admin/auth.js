import { request } from './utils';
import { getToken } from '../../selectors/auth';
import { USER_LOGGED, USER_LOGIN, USER_LOGOUT } from '../auth';

export const TOKEN = 'koopt:admin:token';
export { USER_LOGOUT, USER_LOGIN, USER_LOGGED };

export const checkToken = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'auth:checkToken', token })
      .catch(() => dispatch({ type: USER_LOGOUT }));
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  return { type: USER_LOGOUT };
};

export const logged = (user, token) => dispatch => {
  localStorage.setItem(TOKEN, token);
  dispatch({ type: USER_LOGGED, user, token });
};

export const loginWith = ({ token, service }) => dispatch => {
  dispatch({ type: USER_LOGIN, service });
  return request(dispatch, { method: 'auth:signInWith', token, service }).then(({ user, token }) => {
    dispatch(logged(user, token));
  });
};
