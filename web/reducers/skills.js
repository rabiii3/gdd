import { assoc, dissoc, indexBy, prop } from 'ramda';
import { SKILL_ADDED, SKILL_DELETED, SKILLS_LOADED, SKILL_UPDATED } from '../actions/skills';
import { USER_LOGOUT } from '../actions/auth';

export default (state = { data: {} }, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { data: {} };
    case SKILLS_LOADED:
      return {
        ...state,
        data: indexBy(prop('_id'), action.skills),
      };
    case SKILL_ADDED:
      return {
        ...state,
        data: assoc(action.skill._id, action.skill, state.data),
      };
    case SKILL_DELETED:
      return { ...state, data: dissoc(action.skill._id, state.data) };
    case SKILL_UPDATED:
      return {
        ...state,
        data: assoc(action.skill._id, action.skill, state.data),
      };
    default:
      return state;
  }
};
