import { assoc, dissoc, indexBy, prop } from 'ramda';
import { COMMENT_ADDED, COMMENT_DELETED, COMMENTS_LOADED, COMMENT_UPDATED } from '../actions/comments';
import { USER_LOGOUT } from '../actions/auth';

export default (state = { data: {} }, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { data: {} };

    case COMMENTS_LOADED:
      return {
        ...state,
        data: indexBy(prop('_id'), action.comments),
      };

    case COMMENT_ADDED:
      return {
        ...state,
        data: assoc(action.comment._id, action.comment, state.data),
      };

    case COMMENT_DELETED:
      return { 
        ...state, 
        data: dissoc(action.comment._id, state.data) };

    case COMMENT_UPDATED:
      return {
        ...state,
        data: assoc(action.comment._id, action.comment, state.data)
      };

    default:
      return state;
  }
};
