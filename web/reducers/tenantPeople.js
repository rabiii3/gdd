import { indexBy, prop } from 'ramda';
import { USER_LOGOUT } from '../actions/auth';
import { PEOPLE_LOADED, SORT_PEOPLE} from '../actions/admin/people';
import { FIRST_NAME } from '../selectors/tenantPeople';

export default (
  state = {
    data: {},
    sort: { sortBy: FIRST_NAME, direction: 'asc' },
  },
  action,
) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, data: {} };

    case PEOPLE_LOADED:
      return { ...state, data: indexBy(prop('_id'), action.people) };

    case SORT_PEOPLE:
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
