import { indexBy, prop, assoc, dissoc, join, omit } from 'ramda';
import { PEOPLE_LOADED, PERSON_UPDATED, FILTER_PEOPLES, PERSON_DELETED, RESET_QUERY_PEOPLE, UPDATE_QUERY_PEOPLE, ADD_QUERY_PEOPLE } from '../actions/people';
import { USER_LOGOUT } from '../actions/auth';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, data: {} };

    case PEOPLE_LOADED:
      return {
        ...state,
        data: indexBy(prop('_id'), action.people),
      };

    case PERSON_UPDATED: {
      return {
        ...state,
        data: assoc(action.person._id, action.person, state.data),
      };
    }

    case FILTER_PEOPLES:
      return { ...state, term: action.term };

    case PERSON_DELETED:
      return {
        ...state,
        data: dissoc(action.person._id, state.data),
      };

    case RESET_QUERY_PEOPLE: {
      return omit(['query'], state);
    }

    case UPDATE_QUERY_PEOPLE: {
      return { ...state, query: action.query };
    }

    case ADD_QUERY_PEOPLE: {
      return { ...state, query: join(' ', [action.query, state.query]) };
    }
    
    default:
      return state;
  }
};
