import { propEq, map } from 'ramda';
import { NOTIFICATIONS_OCCURED, NOTIFICATIONS_REMOVED, ALREADY_READ_NOTIFICATIONS } from '../actions/notifications';
import { USER_LOGOUT } from '../actions/auth';

export default (state = { data: [] }, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { data: [] };
    case NOTIFICATIONS_OCCURED:
      return {
        ...state,
        data: [...state.data, action.data.comment],
      };
    case NOTIFICATIONS_REMOVED:
      return {
        ...state,
        data: []
      };
    case ALREADY_READ_NOTIFICATIONS:
      return {
        ...state,
        data: map(notification => {
          if (propEq('_id', action.id)(notification)) {
            return { ...notification, alreadyRead: true };
          }
          return notification;
        })(state.data),
      };
    default:
      return state;
  }
};