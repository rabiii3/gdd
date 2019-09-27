import { indexBy, prop, assoc, dissoc } from 'ramda';
import { USER_LOGOUT } from '../actions/auth';
import { JOBS_LOADED, JOB_ADDED, JOB_DELETED, JOB_UPDATED, SORT_JOBS } from '../actions/jobs';
import { TITLE } from '../selectors/jobs';

export default (
  state = {
    data: {},
    sort: { sortBy: TITLE, direction: 'asc' },
  },
  action,
) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, data: {} };

    case JOBS_LOADED:
      return { ...state, data: indexBy(prop('_id'), action.jobs) };

    case JOB_ADDED:
      return {
        ...state,
        data: assoc(action.job._id, action.job, state.data),
      };

    case JOB_DELETED:
      return {
        ...state,
        data: dissoc(action.job._id, state.data),
      };

    case JOB_UPDATED:
      return {
        ...state,
        data: assoc(action.updates._id, action.updates, state.data),
      };

    case SORT_JOBS:
      return {
        ...state,
        sort:
          state.sort.direction === 'desc'
            ? { sortBy: action.typeSort, direction: 'asc' }
            : { sortBy: action.typeSort, direction: 'desc' },
      };

    default:
      return state;
  }
};
