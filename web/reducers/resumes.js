import { omit, dissoc, assoc, indexBy, prop, join } from 'ramda';
import {
  RESUME_ADDED,
  RESUME_DELETED,
  RESUMES_LOADED,
  RESUME_UPDATED,
  RESUMES_SORT,
  ADD_QUERY_RESUMES,
  UPDATE_QUERY_RESUMES,
  RESET_QUERY_RESUMES,
  RESUMES_STATUS_FILTER,
  RESUMES_SKILLS_FILTER,
  RESUMES_SKILL_CHIP_FILTER,
  RESUMES_SET_TABLE_VIEW,
  RESUMES_SET_SHOW_HIDDEN_RESUMES,
} from '../actions/resumes';
import { USER_LOGOUT } from '../actions/auth';

export default (
  state = {
    data: {},
    statusFilter: '',
    sort: { sortBy: 'status', direction: 'asc' },
    showTableView: false,
    showHiddenResumes: false,
  },
  action,
) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, data: {} };
    case RESUMES_LOADED:
      return {
        ...state,
        data: indexBy(prop('_id'), action.resumes),
      };
    case RESUME_ADDED:
      return {
        ...state,
        data: assoc(action.resume._id, action.resume, state.data),
      };
    case RESUME_DELETED:
      return {
        ...state,
        data: dissoc(action.resume._id, state.data),
      };
    case RESUME_UPDATED:
      return {
        ...state,
        data: assoc(action.updates._id, action.updates, state.data),
      };
    case RESET_QUERY_RESUMES: {
      return omit(['query'], state);
    }
    case UPDATE_QUERY_RESUMES: {
      return { ...state, query: action.query };
    }
    case ADD_QUERY_RESUMES: {
      return { ...state, query: join(' ', [action.query, state.query]) };
    }
    case RESUMES_SORT:
      return {
        ...state,
        sort:
          state.sort.direction === 'desc'
            ? { sortBy: action.typeSort, direction: 'asc' }
            : { sortBy: action.typeSort, direction: 'desc' },
      };
    case RESUMES_STATUS_FILTER:
      return {
        ...state,
        statusFilter: action.status,
      };
    case RESUMES_SKILLS_FILTER:
      return {
        ...state,
        skillsFilter: action.skills,
      };
    case RESUMES_SKILL_CHIP_FILTER:
      return {
        ...state,
        chipSkillFilter: action.skill,
      };
    case RESUMES_SET_TABLE_VIEW:
      return {
        ...state,
        showTableView: !state.showTableView,
      };
    case RESUMES_SET_SHOW_HIDDEN_RESUMES:
      return {
        ...state,
        showHiddenResumes: !state.showHiddenResumes,
      };
    default:
      return state;
  }
};
