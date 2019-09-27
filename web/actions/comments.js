import { request } from './utils';
import { getToken } from '../selectors/auth';

export const COMMENTS_LOADED = 'comments/COMMENTS_LOADED';
export const ADD_COMMENT = 'comments/ADD_COMMENT';
export const COMMENT_ADDED = 'comments/COMMENT_ADDED';
export const DELETE_COMMENT = 'comments/DELETE_COMMENT';
export const COMMENT_DELETED = 'comments/COMMENT_DELETED';
export const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
export const COMMENT_UPDATED = 'comments/COMMENT_UPDATED';

export const add = comment => (dispatch, getState) => {
  dispatch({ type: ADD_COMMENT, comment });
  const token = getToken(getState());
  return request(dispatch, { method: 'comments:add', token, comment }).then(comment =>
    dispatch({ type: COMMENT_ADDED, comment }),
  );
};

export const update = updates => (dispatch, getState) => {
  dispatch({ type: UPDATE_COMMENT, updates });
  const token = getToken(getState());
  return request(dispatch, { method: 'comments:update', token, updates }).then(comment =>
    dispatch({ type: COMMENT_UPDATED, comment }),
  );
};

export const del = comment => (dispatch, getState) => {
  dispatch({ type: DELETE_COMMENT, comment });
  const token = getToken(getState());
  return request(dispatch, { method: 'comments:del', token, comment }).then(comment =>
    dispatch({ type: COMMENT_DELETED, comment }),
  );
};

export const loadAll = comments => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'comments:loadAll', comments, token }).then(comments =>
    dispatch({ type: COMMENTS_LOADED, comments }),
  );
};
