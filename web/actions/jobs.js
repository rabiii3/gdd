import { request } from './utils';
import { getToken } from '../selectors/auth';

export const JOBS_LOADED = "JOBS_LOADED";
export const ADD_JOB = "ADD_JOB";
export const JOB_ADDED = "JOB_ADDED";
export const DELETE_JOB = "DELETE_JOB";
export const UPDATE_JOB = "UPDATE_JOB";
export const JOB_UPDATED = "JOB_UPDATED";
export const JOB_DELETED = "JOB_DELETED";

export const SORT_JOBS = "SORT_JOBS";

export const loadAll = () => (dispatch, getState) => {
  const token = getToken(getState());
  return request(dispatch, { method: 'jobs:loadAll', token }).then(jobs =>
    dispatch({ type: JOBS_LOADED, jobs }),
  );
};

export const add = job => (dispatch, getState) => {
  dispatch({ type: ADD_JOB, job });
  const token = getToken(getState());
  return request(dispatch, { method: 'jobs:add', token, job }).then(job =>
    dispatch({ type: JOB_ADDED, job }),
  );
};

export const del = job => (dispatch, getState) => {
  dispatch({ type: DELETE_JOB, job });
  const token = getToken(getState());
  return request(dispatch, { method: 'jobs:del', token, job }).then(job => 
    dispatch({ type: JOB_DELETED, job }));
};

export const update = updates => (dispatch, getState) => {
  dispatch({type: UPDATE_JOB, updates});
  const token = getToken(getState());
  return request(dispatch, { method: 'jobs:update', token, updates }).then(updates => 
    dispatch({ type: JOB_UPDATED, updates }));
};

export const sortJobs = typeSort => ({ type: SORT_JOBS, typeSort });
