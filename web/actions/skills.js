import { request } from './utils';
import { getToken } from '../selectors/auth';

export const ADD_SKILL = "skills/ADD_SKILL"
export const DELETE_SKILL = "skills/DELETE_SKILL"
export const UPDATE_SKILL = "skills/UPDATE_SKILL"
export const SKILL_ADDED = "skills/SKILL_ADDED"
export const SKILL_DELETED = "skills/SKILL_DELETED"
export const SKILL_UPDATED = "skills/SKILL_UPDATED"
export const SKILLS_LOADED = "skills/SKILLS_LOADED"

export const add = label => (dispatch, getState) => {
  const skill = { label };
  dispatch({type: ADD_SKILL, skill});
  const token = getToken(getState());
  return request(dispatch, { method: 'skills:add', token, skill }).then(skill => dispatch({ type: SKILL_ADDED, skill }));
}

export const del = skill => (dispatch, getState) => {
  dispatch({ type: DELETE_SKILL, skill });
  const token = getToken(getState());
  return request(dispatch, { method: 'skills:del', token, skill }).then(skill => dispatch({ type: SKILL_DELETED, skill }));
}

export const update = skill => (dispatch, getState) => {
  dispatch({type: UPDATE_SKILL, skill});
  const token = getToken(getState());
  return request(dispatch, { method: 'skills:update', token, skill }).then(skill => dispatch({ type: SKILL_UPDATED, skill }));
}

export const loadAll = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'skills:loadAll', token }).then(skills =>
    dispatch({ type: SKILLS_LOADED, skills }),
  );
};
