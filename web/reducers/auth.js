import { omit } from 'ramda';
import { SET_REGISTRATION_TOKEN, USER_LOGGED, USER_LOGOUT, USER_REGISTERED } from '../actions/auth';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_REGISTRATION_TOKEN:
      return { ...state, token: action.token };
    case USER_LOGGED:
      return { ...state, token: action.token, user: action.user };
    case USER_LOGOUT:
      return omit(['user', 'token'], state);
    case USER_REGISTERED:
      return {
        ...state,
        userRegistered: action.user,
      };
    default:
      return state;
  }
};
